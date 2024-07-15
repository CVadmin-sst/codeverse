// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, set, ref, update, onValue, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

const username = document.querySelector(".username");
const email = document.querySelector(".email");
const logout = document.getElementById("logout");

const inboxContainer = document.querySelector(".inbox-container");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const usernameRef = ref(database, 'users/' + uid + '/username');
        onValue(usernameRef, (snapshot) => {
            const usernameData = snapshot.val();
            username.innerText = usernameData;
        })
        
        const emailRef = ref(database, 'users/' + uid + '/email');
        onValue(emailRef, (snapshot) => {
            const emailData = snapshot.val();
            email.innerText = emailData;
        })

        const replyRef = ref(database, 'users/' + uid + '/questions/' + 'reply')
        onValue(replyRef, (snapshot) => {
            const replyData = snapshot.val();
            if (replyData != ""){
                const replyTitle = document.createElement("h2");
                replyTitle.setAttribute("class", "title");
                const replyTitleNode = document.createTextNode("Reply to your latest question");
                replyTitle.appendChild(replyTitleNode);

                const replyDesc = document.createElement("p");
                replyDesc.setAttribute("class", "description");
                const replyDescNode = document.createTextNode(replyData);
                replyDesc.appendChild(replyDescNode);

                const messageBox = document.createElement("div");
                messageBox.setAttribute("class", "message");
                messageBox.appendChild(replyTitle);
                messageBox.appendChild(replyDesc);

                inboxContainer.appendChild(messageBox);
            }
        })
    } else {
    }
})

logout.addEventListener("click", function(){
    auth.signOut().then(() => {
        window.alert("Successfully signed out!");
        window.location.href = "../../index.html";
    }).catch((error) => {
        window.error("Sign out error", error);
    })
})

