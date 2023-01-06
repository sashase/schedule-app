// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD19JkA-PIg3S_pWdiMO56BsMc7geKpXKQ",
  authDomain: "schedule-app-61191.firebaseapp.com",
  projectId: "schedule-app-61191",
  storageBucket: "schedule-app-61191.appspot.com",
  messagingSenderId: "825210987412",
  appId: "1:825210987412:web:b32d7850fe5525c5cb6581"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
