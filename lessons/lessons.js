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
let pythonCourseProgress = document.getElementById("python-course-progress");
let pythonQuicklink = document.getElementById("python-quicklink");
let pythonLessonsBtn = document.getElementById("python-lessons-btn");
let pythonLessons = document.getElementById("python-lessons");
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
let locked = "<i class='bx bxs-lock-alt'></i>";
let pythonLessonNo; 

// Render user data / create user data if first time + lock future lessons
onAuthStateChanged(auth, async () => { 
  const user = auth.currentUser;
  const userRef = ref(database, 'users/' + user.uid);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        pythonLessonNo = snapshot.val().pythonCourseProgress;

        if (pythonLessonNo == undefined) {
          console.log("undefined")
          update(ref(database, 'users/' + user.uid), {
            pythonCourseProgress: 0
          });
          pythonLessonNo = 0;

          pythonCourseProgress.innerText = "Currently at: You haven't started yet!";
          pythonQuicklink.innerText = "Click here to start"
        } else {
          pythonCourseProgress.innerText = "Currently at: Lesson " + pythonLessonNo + "/10";
          pythonQuicklink.innerText = "Go to your current lesson"
        }

        pythonQuicklink.href = "python/lesson" + pythonLessonNo + ".html";
        
        if (pythonLessonNo < 10) {
          lesson10.innerHTML = locked + "Lesson 10";
          lesson10.classList.remove("card-desc");
          lesson10.href = "";
          lesson10.style.cursor = "default";
        } 
        if (pythonLessonNo < 9) {
            lesson9.innerHTML = locked + "Lesson 9";
            lesson9.classList.remove("card-desc");
            lesson9.href = "";
            lesson9.style.cursor = "default";
        } 
        if (pythonLessonNo < 8) {
            lesson8.innerHTML = locked + "Lesson 8";
            lesson8.classList.remove("card-desc");
            lesson8.href = "";
            lesson8.style.cursor = "default";
        } 
        if (pythonLessonNo < 7) {
            lesson7.innerHTML = locked + "Lesson 7";
            lesson7.classList.remove("card-desc");
            lesson7.href = "";
            lesson7.style.cursor = "default";
        } 
        if (pythonLessonNo < 6) {
            lesson6.innerHTML = locked + "Lesson 6";
            lesson6.classList.remove("card-desc");
            lesson6.href = "";
            lesson6.style.cursor = "default";
        } 
        if (pythonLessonNo < 5) {
            lesson5.innerHTML = locked + "Lesson 5";
            lesson5.classList.remove("card-desc");
            lesson5.href = "";
            lesson5.style.cursor = "default";
        } 
        if (pythonLessonNo < 4) {
            lesson4.innerHTML = locked + "Lesson 4";
            lesson4.classList.remove("card-desc");
            lesson4.href = "";
            lesson4.style.cursor = "default";
        } 
        if (pythonLessonNo < 3) {
            lesson3.innerHTML = locked + "Lesson 3";
            lesson3.classList.remove("card-desc");
            lesson3.href = "";
            lesson3.style.cursor = "default";
        } 
        if (pythonLessonNo < 2) {
            lesson2.innerHTML = locked + "Lesson 2";
            lesson2.classList.remove("card-desc");
            lesson2.href = "";
            lesson2.style.cursor = "default";
        } 
        if (pythonLessonNo < 1) {
            lesson1.innerHTML = locked + "Lesson 1";
            lesson1.classList.remove("card-desc");
            lesson1.href = "";
            lesson1.style.cursor = "default";
        } 

      } else {
        pythonCourseProgress.innerText = "No data avaliable";
        pythonQuicklink.style.display = "none";
      }
    })
})

pythonLessonsBtn.addEventListener("click", () => {
  if (pythonLessons.style.display == "inline") {
    pythonLessons.style.display = "none";
    pythonLessonsBtn.innerText = "Show all lessons";
  } else {
    pythonLessons.style.display = "inline";
    pythonLessonsBtn.innerText = "Hide all lessons";
  }
})