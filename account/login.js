let showPassword = document.getElementById("show-password");
let password = document.getElementById("password");
let login = document.getElementById("login");

showPassword.onclick = function(){
    if (showPassword.checked){
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, get, ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

login.addEventListener("click", () => {
    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;

    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = ref(database, 'users/' + user.uid);
                get(userRef)
                    .then((snapshot) => {
                        const userData = snapshot.val();
                        if (userData){
                            update(ref(database, 'users/' + user.uid), {
                                email: emailValue,
                            });
    
                            // Store the user's authentication token in local storage
                            const idToken = userCredential.accessToken;
                            localStorage.setItem('authToken', idToken);
                            alert('Logged-in successfully!')
                            window.location.href = "../index.html";
                        } else {
                            alert("User data not found");
                        }
                    })
                    .catch((error) => {
                        alert("Error fetching user data: " + error.message);
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        })
        .catch((error) => {
            var errorCode = error.message;
            window.alert(errorCode);
        })
})