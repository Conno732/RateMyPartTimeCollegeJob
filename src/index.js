import { networkProtocols } from "./networkProtocols.js";
let network;

if (document.getElementById("createPost")) {
  document.getElementById("createPost").addEventListener("click", () => {
    window.location.href = "./createPost.html";
  });
}

if (document.getElementById("submitPost")) {
  document.getElementById("submitPost").addEventListener("click", () => {
    const title = document.getElementById("jobTitle");
    const company = document.getElementById("companyName");
    const location = document.getElementById("location");
    const description = document.getElementById("synopsis");
    const tag = document.getElementById("tag");
    //Make sure data is valid
    network.createPosting(
      company.value,
      title.value,
      location.value,
      description.value,
      tag.value
    );
  });
}

if (document.getElementById("password2")) {
  document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    if (
      password.value === password2.value &&
      username.value.substring(username.value.length - 3) === "edu"
    ) {
      network.setEmailPassword(username.value, password.value);
      network.createAccount();
    } else {
      console.log("wrong!!!");
    }
  });
} else if (document.getElementById("submit")) {
  if (document.getElementById("createAccount"))
    document.getElementById("createAccount").addEventListener("click", () => {
      window.location.href = "./create_account.html";
    });
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
    document.getElementById("refresh").addEventListener("click", () => {
      network.downloadPostings();
    });
    document.getElementById("searchSubmit").addEventListener("click", () => {
      const searchInfo = document.getElementById("search").value;
      console.log(searchInfo);
      network.downloadBySearch(searchInfo);
    });
    // document.querySelectorAll(".tag").forEach((node) => {
    //   node.addEventListener("click", () => {
    //     //do something node.id
    //   });
    // });
  }
}

start();
