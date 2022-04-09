import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth();
    this.docId;
  }

  setEmailPassword(email, password) {
    this.email = email;
    this.password = password;
  }

  createAccount() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        sessionStorage.setItem(
          "loginData",
          JSON.stringify([userCredential.user.email])
        );
        window.location.href = "./jobPostings.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
        // ..
      });
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        this.UserEmail = userCredential.user.email;
        sessionStorage.setItem(
          "loginData",
          JSON.stringify([userCredential.user.email])
        );
        window.location.href = "./jobPostings.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
      });
  }

  createPosting(company, title, tag, location, description) {
    const postings = (async () => {
      try {
        const docRef = await addDoc(collection(this.db, "postings"), {
          poster: `${JSON.parse(sessionStorage.getItem("loginData"))}`,
          company: `${company}`,
          title: `${title}`,
          tag: `${tag}`,
          location: `${location}`,
          pay: `N/A`,
          stars: "N/A",
          reviews: {}, //user email, rating, description
          description: `${description}`,
        });
        console.log("Document written with ID: ", docRef.id);
        let docu = doc(this.db, "postings", docRef.id);
        (async () => {
          await updateDoc(docu, {
            id: docRef.id,
          });
        })();
        //const docSnap = await getDoc(doc(this.db, "postings", docRef.id));
        //sessionStorage.setItem("currentDoc", JSON.stringify(docSnap.data()));
        sessionStorage.setItem("currentID", JSON.stringify(docRef.id));

        window.location.href = "./jobPost.html";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })();
  } //take object parameter that contains posting data, upload it to server

  downloadPostings() {
    (async () => {
      const postings = collection(this.db, "postings");
      const snapshot = await getDocs(postings);
      const postDiv = document.getElementById("postings");
      snapshot.forEach((doc) => {
        let data = doc.data();
        let html = document.createElement("div");
        html.innerHTML = `<p> Title: ${data.title}, Company: ${data.company}, Pay: $${data.pay}, Location: ${data.location}, stars: ${data.stars}, Description: ${data.description}`;
        html.id = `${data.id}`;
        html.addEventListener("click", () => {
          sessionStorage.setItem("currentID", JSON.stringify(html.id));
          window.location.href = "./jobPost.html";
        });
        postDiv.appendChild(html);
      });
    })();
  } //download ?all? postings from the server return a list of posting data

  downloadPost() {
    const documentData = JSON.parse(sessionStorage.getItem("currentID"));
    let snapshot;
    (async () => {
      const post = doc(this.db, "postings", documentData);
      snapshot = await getDoc(post);
    })().then(() => {
      let data = snapshot.data();
      //console.log(snapshot.data());
      document.getElementById("title").innerText = data.title;
      document.getElementById("poster").innerText = data.poster;
      document.getElementById("company").innerText = data.company;
      document.getElementById("location").innerText = data.location;
      document.getElementById("pay").innerText = data.pay;
      document.getElementById("tag").innerText = data.tag;
      document.getElementById("stars").innerText = `${data.stars}`;
      document.getElementById("description").innerText = `${data.description}`;
      const userReviews = document.getElementById("reviewDiv");
      const reviewAppend = document.createElement("div");
      let reviewsData = data.reviews;
      for (let rev in data.reviews) {
        const dataStuff = data.reviews[rev];
        reviewAppend.innerHTML += `Stars: ${dataStuff.stars} Review ${dataStuff.review} Pay: ${dataStuff.pay}`;
      }
      userReviews.appendChild(reviewAppend);

      document.getElementById("submitReview").addEventListener("click", () => {
        const reviewTextInput =
          document.getElementById("reviewTextInput").value;
        const reviewStarInput =
          document.getElementById("reviewStarInput").value;
        const payInput = document.getElementById("payInput").value;
        const review = {
          review: reviewTextInput,
          stars: reviewStarInput,
          pay: payInput,
          user: JSON.parse(sessionStorage.getItem("loginData")),
        };
        console.log(reviewsData);
        reviewsData[`${JSON.parse(sessionStorage.getItem("loginData"))}`] =
          JSON.parse(JSON.stringify(review));
        console.log(reviewsData);
        this.uploadReview(JSON.parse(JSON.stringify(reviewsData)));
      });
    });
  }

  uploadReview(reviews) {
    //console.log(documentData);
    let starTotal = 0;
    let payTotal = 0;
    //Object.keys(myObj).length;
    for (let rev in reviews) {
      payTotal += parseInt(reviews[rev].pay);
      starTotal += parseInt(reviews[rev].stars);
    }
    console.log(payTotal);
    starTotal = starTotal / Object.keys(reviews).length;
    payTotal = payTotal / Object.keys(reviews).length;

    const docRef = doc(
      this.db,
      "postings",
      JSON.parse(sessionStorage.getItem("currentID"))
    );
    (async () => {
      await updateDoc(docRef, {
        stars: starTotal,
        reviews: reviews,
        pay: payTotal,
      });
    })().then(() => {
      window.location.href = "./jobPost.html";
    });
  }
}
