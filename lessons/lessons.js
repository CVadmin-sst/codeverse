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
let lessonLinks = document.getElementsByClassName("lesson-link");

// Other useful variables
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

        for(let i = 0; i <= pythonLessonNo; i++) {
          let link = lessonLinks[i];
          link.innerText = "Lesson " + i;
          link.classList.add("card-desc");
          link.href = "python/lesson" + i + ".html";
          link.style.cursor = "pointer";
        }

      } else {
        pythonCourseProgress.innerText = "No data avaliable";
        pythonQuicklink.style.display = "none";
      }
    })
})

pythonLessonsBtn.addEventListener("click", () => {
  switch (pythonLessons.style.display) {
    case "inline":
      pythonLessons.style.display = "none";
      pythonLessonsBtn.innerText = "Show all lessons";
    default:
      pythonLessons.style.display = "inline";
    pythonLessonsBtn.innerText = "Hide all lessons";
  }
})