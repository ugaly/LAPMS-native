// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID


// };

const firebaseConfig = {
  apiKey: "AIzaSyDOCxvm-g4J1Q7XWXnVI6tEPK-GsUlHwbY",
  authDomain: "valentine-7b881.firebaseapp.com",
  databaseURL: "https://valentine-7b881-default-rtdb.firebaseio.com",
  projectId: "valentine-7b881",
  storageBucket: "valentine-7b881.appspot.com",
  messagingSenderId: "417901916489",
  appId: "1:417901916489:web:97726f33812e4912b22a98",
  measurementId: "G-VWB40Y2NV3"
};




// Initialize Firebase
export const app = initializeApp(firebaseConfig);