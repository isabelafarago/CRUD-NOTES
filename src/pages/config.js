import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const app = initializeApp({
	apiKey: "AIzaSyDd94dt7Mz-OKe_kH8mHU5oFZG2pszffvw",
    authDomain: "keep-45c07.firebaseapp.com",
    projectId: "keep-45c07",
    storageBucket: "keep-45c07.appspot.com",
    messagingSenderId: "283202711798",
    appId: "1:283202711798:web:72a12094c865cf870dbcd7",
    measurementId: "G-QXDKHXTMB5"
  });

  const db = getFirestore(app);
  export default db;  
