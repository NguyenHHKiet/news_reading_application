"use strict";

const KEY = "userArr";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

const btnSubmit = document.getElementById("btn-submit");
const inputFN = document.getElementById("input-firstname");
const inputLN = document.getElementById("input-lastname");
const inputUN = document.getElementById("input-username");
const inputPW = document.getElementById("input-password");
const inputPWC = document.getElementById("input-password-confirm");

// window.location.href = "login.html";
// localStorage.setItem("userArr", JSON.stringify(userArr));
// localStorage.clear();

btnSubmit.addEventListener("click", () => {
    if (validateForm(userArr)) {
        const user = {
            firstName: inputFN.value,
            lastName: inputLN.value,
            username: inputUN.value,
            password: inputPW.value,
        };
        const dataUser = parseUser(user);
        userArr.push(dataUser);
        saveToStorage("userArr", JSON.stringify(userArr));
        window.location.href = "login.html";
    }
});

function validateForm(userArr) {
    let regexText = /([A-Z])\w+/g;
    let regexUsername = /([a-z])/g;
    if (!regexText.test(inputFN.value) && !regexText.test(inputLN.value)) {
        alert("FirstName and LastName (capital uppercase letter)");
        return false;
    } else if (!regexUsername.test(inputUN.value)) {
        alert("Username lowercase letter");
        return false;
    } else if (!validatePassword(inputPW.value)) {
        alert(
            "Password not valid (8 characters {uppercase, lowercase, number})"
        );
        return false;
    } else if (inputPW.value !== inputPWC.value) {
        alert("Confirm Password");
        return false;
    } else if (!uniqueUsername(userArr)) {
        alert("Username is duplicate");
        return false;
    }
    return true;
}

function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}
function uniqueUsername(userArr) {
    for (const user of userArr) {
        if (user.username === inputUN.value) return false;
    }
    return true;
}
function parseUser(userData) {
    const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
    });

    return user;
}
