import { networkProtocols } from "./networkProtocols.js";
let network;

if (document.getElementById("queryData")) {
  document.getElementById("queryData").addEventListener("click", () => {});
  document.getElementById("addData").addEventListener("click", () => {
    network.createPosting("googal", "dev", "sophomore", "middlebook", "400", 5);
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

function displayJobPostings() {}

start();
