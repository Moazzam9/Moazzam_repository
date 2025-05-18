import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCYznNKiU8m8Px9EEytg5IrrlanWcqOTz0",
    authDomain: "servify-66b6f.firebaseapp.com",
    databaseURL: "https://servify-66b6f-default-rtdb.firebaseio.com",
    projectId: "servify-66b6f",
    storageBucket: "servify-66b6f.appspot.com",
    messagingSenderId: "853851673970",
    appId: "1:853851673970:web:70a8b4764046cba5ca79eb",
    measurementId: "G-H1WMFLXF7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

export { app, analytics, db, storage, rtdb }; 