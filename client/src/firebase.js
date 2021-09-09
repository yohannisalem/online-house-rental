import firebase from "firebase/app";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCblDUpUnUFzh0gki11nRc8yjuuV_YTaCI",
  authDomain: "houserental-d2711.firebaseapp.com",
  projectId: "houserental-d2711",
  storageBucket: "houserental-d2711.appspot.com",
  messagingSenderId: "318171308105",
  appId: "1:318171308105:web:b4e079877498ccd15a9f98",
  measurementId: "G-5X9ZBKVM5B"
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const storage = firebase.storage();
export default storage;
