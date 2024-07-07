// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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

let welcomeHeader = document.querySelector(".welcome h1");
let links = document.querySelectorAll(".working-link");
let button = document.querySelector(".btn");
let sidebarLogin = document.querySelector(".sidebar-login");

function secureLinks(link){
    link.addEventListener('click', function(event){
        event.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user){
                window.location.href = link.href;
            } else {
                window.alert("Please sign in in order to use CodeVerse to its fullest");
            }
        })
    })
}
links.forEach(secureLinks);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const userRef = ref(database, 'users/' + uid + '/username');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            //welcomeHeader.innerHTML = "Welcome back, <span>" + data + "</span>";
            var text = new Typed(".typed", {
                strings: ["Welcome back, <span>" + data + "</span>"],
                typeSpeed: 50
            })
        })
        sidebarLogin.innerText = "Account";
        sidebarLogin.href = "account/account.html";
        button.innerText = "Account";
        button.href = "account/account.html";
    } else {
        var text = new Typed(".typed", {
            strings: ["Welcome to the <span>CodeVerse</span>"],
            typeSpeed: 80
        })
        //welcomeHeader.innerHTML = "Welcome to the <span>CodeVerse</span>";
    }
})