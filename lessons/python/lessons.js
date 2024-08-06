// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, get, ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMpHqIl0n2qPLkg9taA5w4UspN5YOtzQ8",
    authDomain: "codeverse-612fe.firebaseapp.com",
    databaseURL: "https://codeverse-612fe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codeverse-612fe",
    storageBucket: "codeverse-612fe.appspot.com",
    messagingSenderId: "991671604350",
    appId: "1:991671604350:web:952c630d916324fcd8f42f",
    measurementId: "G-5KFL98MYTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

// Import database
import lessonJson from './lessons.json' with {type: 'json'};

// Initialize elements
let lessonLinks = document.getElementsByClassName("link");

// Other useful variables
let pythonLessonNo;

// Lock future lessons
onAuthStateChanged(auth, async () => { 
    const user = auth.currentUser;
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
            pythonLessonNo = snapshot.val().pythonCourseProgress; 
            for(let i = 0; i <= pythonLessonNo; i++) {
                let link = lessonLinks[i];
                link.innerText = "Lesson " + i;
                link.classList.add("unlock");
                link.href = "lesson" + i + ".html";
                link.style.cursor = "pointer";
            }
        } else {
            console.log("user not found");
        }
    })
})

// Initalise elements
let currLesson = document.getElementById("currLesson").innerText.slice(7);
let QQns= [
    document.getElementById("q1qn"),
    document.getElementById("q2qn"),
    document.getElementById("q3qn")
]
let qns = [
    document.getElementsByName("q1"),
    document.getElementsByName("q2"),
    document.getElementsByName("q3")
]
let ops = [
    document.getElementsByName("op1"),
    document.getElementsByName("op2"),
    document.getElementsByName("op3")
]

let ansArray = []

let load = async () => {
    let lessonData;
    let currLessonData = lessonJson[currLesson];
    for(let i = 0, length = currLessonData.length; i < length; i++) {
        lessonData = currLessonData[i]
        QQns[i].innerHTML = lessonData.question;
        ansArray.push([false, false, false, false]);
        ansArray[i][Math.floor(Math.random() * 4)] = true;
        let unusedIndex = [];
        let currIndex = -1;
        for(let j = 0; j < 4; j++) {
            let currQn = qns[i][j];
            let currOp = ops[i][j];
            currQn.id = currOp.htmlFor = "q" + [i] + "op" + [j];
            if (ansArray[i][j]) {
                currOp.innerText = lessonData.answer;
            } else {
                do { 
                    currIndex = Math.floor(Math.random() * 3);
                } while (unusedIndex.indexOf(currIndex) != -1)
                currOp.innerText = lessonData.options[currIndex];
                unusedIndex.push(currIndex);
            }
        }
    }
}
load();

// Initalise elements
let submitBtn = document.getElementById("submit");
let submitMsg = document.getElementById("submit-msg");
let nextLesson = document.getElementById("next-lesson");

// Initalise variables
let currLessonNo;
if (currLesson == " ") 
    { currLessonNo = parseInt(currLesson[-1])} 
else { currLessonNo = parseInt(currLesson.slice(-2)) }

submitBtn.addEventListener("click", () => {
    let rightAns = []
    for (var i = 0, length = ansArray.length; i < length; i++) {
        for (var j = 0, len = ansArray.flat().length; j < len; j++) {
            let currAns = ansArray[i][j];
            let currQn = qns[i][j];
            if (currAns && currQn.checked) {
                rightAns.push("question " + (i+1))
            }
        }
    }
    switch (rightAns.length) {
        case ansArray.length:
            submitMsg.innerText = "You got all questions correct! \nMove onto the next lesson";
            nextLesson.style.display = "flex";

            if (pythonLessonNo == currLessonNo) {
                const user = auth.currentUser;
                update(ref(database, 'users/' + user.uid), {
                    pythonCourseProgress: (currLessonNo + 1)
                });
            }
            break;
        case 1:
            submitMsg.innerText = "You got " + rightAns[0] + " correct. \nTry again.";
            break;
        case 0:
            submitMsg.innerText = "You got 0 questions correct. \nTry again.";
            break;
        default:
            submitMsg.innerText = "You got " + rightAns[0] + " and " + rightAns[1] + " correct. \nTry again.";
            break;
    }
})

// Initialise elements
let code;
// code = document.getElementById('exercise-code').value; 
// (moved to exercise function because when init it gets default value)
let checkBtn = document.getElementById("exercise-check");
let outputTxt = document.getElementById('exercise-output');

// Initialise variables
// currLessonNo is used
let pyodideLoad = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
let pythonRun;

// Python code for exercise picker function
const exerciseLessonCode = () => {
    switch(currLessonNo) {
        case 3:
        pythonRun = `
import sys
from io import StringIO
output1 = "10"
output2 = "John Tan"
sys.stdin = StringIO()
sys.stdin.write(output1 + "\\n" + output2)
sys.stdin.seek(0)
${code}
test_result = sys.stdout.strip()[-11:] == output2 + "\\n" + output1`
        break;

        default:
            pythonRun = null;
    }
}

// Exercise function
checkBtn.addEventListener("click", async () => {
    code = document.getElementById('exercise-code').value;
    console.log("Loading Python...");
    let pyodide = await pyodideLoad;
    try {
        exerciseLessonCode();
        console.log("Running Python...");
        pyodide.runPython(pythonRun);
        console.log("Checking Result...");
        let result = pyodide.globals.get("test_result");
        outputTxt.innerText = result ? "Test passed\nCongratulations 🎉" : "Test failed\nTry again";
    } catch (error) {
        outputTxt.innerText = error;
    }
});