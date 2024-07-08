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

// Initialize elements
let lesson1 = document.getElementById("lesson-1");
let lesson2 = document.getElementById("lesson-2");
let lesson3 = document.getElementById("lesson-3");
let lesson4 = document.getElementById("lesson-4");
let lesson5 = document.getElementById("lesson-5");
let lesson6 = document.getElementById("lesson-6");
let lesson7 = document.getElementById("lesson-7");
let lesson8 = document.getElementById("lesson-8");
let lesson9 = document.getElementById("lesson-9");
let lesson10 = document.getElementById("lesson-10");

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
  
            if (pythonLessonNo > 0) {
                lesson1.innerText = "Lesson 1";
                lesson1.classList.add("unlock");
                lesson1.href = "lesson1.html";
                lesson1.style.cursor = "pointer";
            }
            if (pythonLessonNo > 1) {
                lesson2.innerText = "Lesson 2";
                lesson2.classList.add("unlock");
                lesson2.href = "lesson2.html";
                lesson2.style.cursor = "pointer";
            }
            if (pythonLessonNo > 2) {
                lesson3.innerText = "Lesson 3";
                lesson3.classList.add("unlock");
                lesson3.href = "lesson3.html";
                lesson3.style.cursor = "pointer";
            }
            if (pythonLessonNo > 3) {
                lesson4.innerText = "Lesson 4";
                lesson4.classList.add("unlock");
                lesson4.href = "lesson4.html";
                lesson4.style.cursor = "pointer";
            }
            if (pythonLessonNo > 4) {
                lesson5.innerText = "Lesson 5";
                lesson5.classList.add("unlock");
                lesson5.href = "lesson5.html";
                lesson5.style.cursor = "pointer";
            }
            if (pythonLessonNo > 5) {
                lesson6.innerText = "Lesson 6";
                lesson6.classList.add("unlock");
                lesson6.href = "lesson6.html";
                lesson6.style.cursor = "pointer";
            }
            if (pythonLessonNo > 6) {
                lesson7.innerText = "Lesson 7";
                lesson7.classList.add("unlock");
                lesson7.href = "lesson7.html";
                lesson7.style.cursor = "pointer";
            }
            if (pythonLessonNo > 7) {
                lesson8.innerText = "Lesson 8";
                lesson8.classList.add("unlock");
                lesson8.href = "lesson8.html";
                lesson8.style.cursor = "pointer";
            }
            if (pythonLessonNo > 8) {
                lesson9.innerText = "Lesson 9";
                lesson9.classList.add("unlock");
                lesson9.href = "lesson9.html";
                lesson9.style.cursor = "pointer";
            }
            if (pythonLessonNo > 9) {
                lesson10.innerText = "Lesson 10";
                lesson10.classList.add("unlock");
                lesson10.href = "lesson10.html";
                lesson10.style.cursor = "pointer";
            }

  
        } else {
            console.log("user not found");
        }
    })
})

//Initialise elements
let currLesson = document.getElementById("currLesson");
let question1 = document.getElementsByName('question1');
let question2 = document.getElementsByName('question2');
let question3 = document.getElementsByName('question3');
let submitBtn = document.getElementById("submit");
let submitMsg = document.getElementById("submit-msg");
let nextLesson = document.getElementById("next-lesson");

// Initialise variables
let currLessonNo;
let correctAnsNo = 0, ansNo = 0;
if (currLesson.innerText[-2] == " ") 
    { currLessonNo = parseInt(currLesson.innerText[-1])} 
else { currLessonNo = parseInt(currLesson.innerText.slice(-2)) }
let q1CorrectAnsList = ["option3", "option3", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1"]
let q2CorrectAnsList = ["option4", "option2", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1"]
let q3CorrectAnsList = ["noption", "noption", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1", "option1"]
// if any correct answer is "noption", it means that qN does not exist (eg. q3)

// For later when doing lessons and user does one
submitBtn.addEventListener("click", () => {
    valQuestion(question1, q1CorrectAnsList);
    valQuestion(question2, q2CorrectAnsList);
    valQuestion(question3, q3CorrectAnsList);

    if (correctAnsNo == ansNo) {
        submitMsg.innerText = "You got all questions correct! 👍 \nWell done! 😊 \nMove onto the next lesson!";
        nextLesson.style.display = "flex";
        currLessonNo += 1

        const user = auth.currentUser;
        update(ref(database, 'users/' + user.uid), {
            pythonCourseProgress: currLessonNo
        });

    } else {
        submitMsg.innerText = "You got " + correctAnsNo + "/" + ansNo +  " questions correct. 😔 \n It's okay to fail, just try again. 😁\n You can do this! 👍";
    }

    correctAnsNo = 0;
    ansNo = 0;
});


const valQuestion = (questionInput, optionsList) => {
    var val= "";
    var correctAns = optionsList[currLessonNo];
    if (correctAns != "noption") {
        ansNo += 1;
    }

    for (var i = 0, length = questionInput.length; i < length; i++) {
        if (questionInput[i].checked) {
            val = questionInput[i].value;
            break;
        }
    }

    if ( val == correctAns ) {
        correctAnsNo += 1;
    }
}