import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, collection, addDoc } from "firebase/firestore";

export class networkProtocols {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCxxIViASxVgJKECJx5GB6rwazmpbBkZik",
      authDomain: "ratemyjob-9c02a.firebaseapp.com",
      databaseURL: "https://ratemyjob-9c02a-default-rtdb.firebaseio.com",
      projectId: "ratemyjob-9c02a",
      storageBucket: "ratemyjob-9c02a.appspot.com",
      messagingSenderId: "985752456943",
      appId: "1:985752456943:web:0aece92f2d0b9a21ff151a",
    };
    this.email;
    this.password;
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth();
    this.UserEmail;
  }

  setEmailPassword(email, password) {
    this.email = email;
    this.password = password;
  }

  createAccount() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        this.UserEmail = userCredential.user.email;
        console.log(userCredential.user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        this.UserEmail = userCredential.user.email;
        console.log(userCredential.user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  createPosting(company, title, tag, location, pay, stars) {
    (async () => {
      try {
        const docRef = await addDoc(collection(this.db, "postings"), {
          company: `${company}`,
          title: `${title}`,
          tag: `${tag}`,
          location: `${location}`,
          pay: `${pay}`,
          stars: stars,
          reviews: [],
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })();
  } //take object parameter that contains posting data, upload it to server

  downloadPostings() {} //download ?all? postings from the server return a list of posting data
}
