let showPassword = document.getElementById("show-password");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let signUp = document.getElementById("sign-up");

showPassword.onclick = function(){
    if (showPassword.checked){
        password.type = 'text';
        confirmPassword.type = 'text';
    } else {
        password.type = 'password';
        confirmPassword.type = 'password';
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

signUp.addEventListener("click", async (e) => {
    e.preventDefault();

    const emailValue = document.getElementById("email").value;
    const usernameValue = document.getElementById("username").value;
    const passwordValue = document.getElementById("password").value;
    const confirmedPasswordValue = document.getElementById("confirm-password").value;
    
    if (passwordValue === confirmedPasswordValue) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
            const user = userCredential.user;

            await set(ref(database, 'users/' + user.uid), {
                email: emailValue,
                username: usernameValue
            });

            alert('User created! Please log in');
            window.location.href = "login.html";
        } catch (error) {
            console.error("Error creating user:", error);
            alert(error.message);
        }
    } else {
        window.alert("Passwords don't match");
    }
});