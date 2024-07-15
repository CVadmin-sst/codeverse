// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, get, ref, child, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

const questionsContainer = document.querySelector(".questions-container");

async function getUsersQuestions(){
    try {
        const snapshot = await get(child(ref(database), 'users'))
        if (snapshot.exists()){
            const users = snapshot.val();
            for (const userId in users) {
                if (users.hasOwnProperty(userId)) {
                    console.log(`User ID: ${userId}`);
                    const user = users[userId];

                    const questionsSnapshot = await get(child(ref(database), `users/${userId}/questions`));
                    if (questionsSnapshot.exists()) {
                        const questions = questionsSnapshot.val();
                        if (questions.question != "" || questions.description != ""){
                            const questionTitle = document.createElement("h1");
                            questionTitle.setAttribute("class", "title");
                            const questionTitleNode = document.createTextNode(questions.question);
                            questionTitle.appendChild(questionTitleNode);
            
                            const questionDesc = document.createElement("p");
                            questionDesc.setAttribute("class", "description");
                            const questionDescNode = document.createTextNode(questions.description);
                            questionDesc.appendChild(questionDescNode);
            
                            const submitBtn = document.createElement("input");
                            submitBtn.setAttribute("type", "submit");
                            submitBtn.setAttribute("class", "submit");
                            submitBtn.setAttribute("id", userId);
                            submitBtn.addEventListener("click", () => {
                                const respectiveReplyField = document.getElementById(submitBtn.id);

                                const questionsRef = ref(database, 'users/' + submitBtn.id + '/questions/');
                                set(questionsRef, {
                                    question: "",
                                    description: "",
                                    reply: respectiveReplyField.value
                                })
                                window.alert("Reply updated");
                                respectiveReplyField.value = "";
                            })

                            const textField = document.createElement("textarea");
                            textField.setAttribute("class", "reply");
                            textField.setAttribute("placeholder", "Reply..");
                            textField.setAttribute("id", userId);
            
                            const newQuestion = document.createElement("div");
                            newQuestion.setAttribute("class", "question");
                            newQuestion.appendChild(questionTitle);
                            newQuestion.appendChild(questionDesc);
                            newQuestion.appendChild(textField);
                            newQuestion.appendChild(submitBtn);
                            
                            questionsContainer.appendChild(newQuestion);
                        }
                    } else {
                        console.log(`No questions found for User ${userId}`);
                    }
                }
            }
        }  
    } catch (error){
        console.log(error)
    }
}
getUsersQuestions();

/*
submitButtons.forEach((e) => {
    e.addEventListener("click", () => {
        const respectiveReply = document.getElementById(e.id);
        const questionsRef = ref(database, 'users/' + e.id + '/questions/');
        set(questionsRef, {
            question: "",
            description: "",
            reply: respectiveReply.value
        })
        window.alert("Reply updated");
        respectiveReply.value = "";
    })
});
*/