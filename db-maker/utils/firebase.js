// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.PUBLIC_API_KEY,
  authDomain: process.env.PUBLIC_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_PROJECT_ID,
  storageBucket: process.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_APP_ID
}

// const firebaseConfig = {
//   apiKey: "AIzaSyB_yajfK5mrIYR4a4Fne6MoMdJsZgfK5HE",
//   authDomain: "schedule-app-2ae96.firebaseapp.com",
//   projectId: "schedule-app-2ae96",
//   storageBucket: "schedule-app-2ae96.appspot.com",
//   messagingSenderId: "259952867065",
//   appId: "1:259952867065:web:36a8997d3b5bd519fcd428"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
