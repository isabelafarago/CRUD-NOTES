import db from "../config.js";
import { collection, addDoc }  from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

document.getElementById("login-form").addEventListener("submit", function(e) {
	e.preventDefault();
  
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
  
	validateUser(email, password)
	  .then(function(user) {
		if (user) {
		  window.location.href = "/src/pages/Home/Home.html";
		} else {
		  showNotification("Verifque o E-mail e senha. O login não foi possível.");
		}
	  })
	  .catch(function(error) {
		showNotification("Houve um erro na hora do login, por favor, tente novamente mais tarde.");
		console.error("Error durante o login:", error);
	  });
  });
  
  async function validateUser(email, password) {
	const usersCollection = collection(db, "users");
  	const querySnapshot = await getDocs(usersCollection);
  		for (const doc of querySnapshot.docs) {
	  		const user = doc.data();
	 	if (user.email === email && user.password === password) {
		return user; 
	  }
	}
  
	return null; 
  }
  function showNotification(message) {
	const notification = document.createElement("div");
	notification.className = "notification";
	notification.innerText = message;
  
	const notificationContainer = document.getElementById("notification-container");
	notificationContainer.appendChild(notification);
  
	setTimeout(function() {
	  notification.remove();
	}, 3000);
  }