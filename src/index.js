import { networkProtocols } from "./networkProtocols.js";
let network;

if (document.getElementById("createPost")) {
  document.getElementById("createPost").addEventListener("click", () => {
    window.location.href = "./createPost.html";
  });
}

if (document.getElementById("submitPost")) {
  document.getElementById("submitPost").addEventListener("click", () => {
    const title = document.getElementById("title");
    const company = document.getElementById("company");
    const location = document.getElementById("location");
    const tag = document.getElementById("tag");
    const description = document.getElementById("description");
    //Make sure data is valid
    network.createPosting(
      company.value,
      title.value,
      tag.value,
      location.value,
      description.value
    );
  });
}

if (document.getElementById("password2")) {
  document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    if (password.value === password2.value) {
      network.setEmailPassword(username.value, password.value);
      network.createAccount();
    } else {
      console.log("wrong!!!");
    }
  });
} else if (document.getElementById("submit")) {
  document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    network.setEmailPassword(username.value, password.value);
    network.login();
  });
}

function start() {
  network = new networkProtocols();
  if (document.getElementById("jobPostFlag")) {
    network.downloadPost();
    // const reviews = data.reviews;
    //console.log(reviews);
  }
  if (document.getElementById("queryData")) {
    network.downloadPostings();
  }
}

start();
