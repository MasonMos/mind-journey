// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8-xmEVWaKHr6KdcEqNDjd7fV_Iea4swU",
    authDomain: "mind-journey-c87f7.firebaseapp.com",
    projectId: "mind-journey-c87f7",
    storageBucket: "mind-journey-c87f7.appspot.com",
    messagingSenderId: "976475736424",
    appId: "1:976475736424:web:a12fe844c475c4a11ceedd",
    measurementId: "G-29X0879GLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};