"use strict";

const KEY = "currentUser";
const userObj = JSON.parse(getFromStorage(KEY)) || undefined;
const currentUser = new User(userObj);

const btnLogout = document.getElementById("btn-logout");

const contentUser = document.querySelector("#login-modal>p");
const tempContent = contentUser.textContent;
// localStorage.clear();

if (currentUser) contentUser.textContent = `Welcome ${currentUser.firstName}`;

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    contentUser.textContent = `${tempContent}`;
    window.location.href = "../pages/login.html";
});
