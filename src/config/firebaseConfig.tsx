import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtxx4lt7QH1zwcoFyZ1EV9hxxGeOqSBc0",
  authDomain: "fy-project-e3584.firebaseapp.com",
  projectId: "fy-project-e3584",
  storageBucket: "fy-project-e3584.appspot.com",
  messagingSenderId: "581897569996",
  appId: "1:581897569996:web:42168866f81ba2bd2de469",
  measurementId: "G-W64NB0VH5E",
  databaseURL: "https://fy-project-e3584-default-rtdb.firebaseio.com" // Realtime Database URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const database = getDatabase(app);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

// Fetch sensor data from Firestore
const fetchSensorDataFromFirestore = async () => {
  const docRef = doc(db, "sensorData"); // Adjust the path to your data
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Fetch sensor data from Realtime Database
const fetchSensorDataFromRealtimeDatabase = async () => {
  const dbRef = ref(database, "sensorData"); // Adjust the path to your data
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val();
    
  } else {
    console.log("No data available");
    return null;
  }
};

// src/config/firebaseConfig.ts
// const fetchSensorDataFromRealtimeDatabase = async () => {
//   const dbRef = ref(database, "sensorData");
//   const snapshot = await get(dbRef);

//   if (snapshot.exists()) {
//     const data = snapshot.val();
//     const keys = Object.keys(data);
//     const latestKey = keys[keys.length - 1]; // Assumes keys are in chronological order
//     return data[latestKey];
//   } else {
//     console.log("No data available");
//     return null;
//   }
// };






export { auth,database, signInWithGoogle, signInWithEmail, fetchSensorDataFromFirestore, fetchSensorDataFromRealtimeDatabase, db };
