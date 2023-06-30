import db from "../config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function() {

const usersCollection = collection(db, "users");

document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const newUser = {
    name: name,
    email: email,
    password: password
  };

  addDoc(usersCollection, newUser)
    .then(function () {
      // Display success message
      showNotification("Cadastro realizado com sucesso!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch(function (error) {
      showNotification("Houve um erro ao tentar realizar o cadastro, por favor, tente novamente!");
      console.error("O cadastro não pode ser realizado!", error);
    });
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.remove();
  }, 3000);
}

document.getElementById("login-button").addEventListener("click", function () {
  window.location.href = "/src/pages/Login/login.html";
});
});

