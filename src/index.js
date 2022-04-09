import { networkProtocols } from "./networkProtocols.js";
let network;

if (document.getElementById("queryData")) {
  document.getElementById("queryData").addEventListener("click", () => {
    network.downloadPostings();
  });
}

if (document.getElementById("createPost")) {
  document.getElementById("createPost").addEventListener("click", () => {
    window.location.href = "./createPost.html";
  });
}

if (document.getElementById("submitPost")) {
  document.getElementById("submitPost").addEventListener("click", () => {
    const title = document.getElementById("title");
    const company = document.getElementById("company");
    const pay = document.getElementById("pay");
    const location = document.getElementById("location");
    const tag = document.getElementById("tag");
    const stars = document.getElementById("stars");
    //Make sure data is valid
    network.createPosting(
      company.value,
      title.value,
      tag.value,
      location.value,
      pay.value,
      stars.value
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
}

start();
