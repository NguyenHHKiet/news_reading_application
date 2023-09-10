"use strict";

const KEY = "userArr";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

let username = false,
    password = false;

const btnSubmit = document.getElementById("btn-submit");
const inputUN = document.getElementById("input-username");
const inputPW = document.getElementById("input-password");

// userArr.forEach((user) => {
//     const userObj = new User({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         username: user.username,
//         password: user.password,
//     });
//     console.log(userObj.sayHello());
// });

btnSubmit.addEventListener("click", () => {
    if (validateForm()) {
        const currentUser = userArr.find(
            (user) => user.username === inputUN.value
        );
        saveToStorage("currentUser", JSON.stringify(currentUser));
        window.location.href = "../index.html";
    }
});

function validateForm() {
    validateLogin(userArr);
    if (!(inputUN.value && username)) {
        alert("Username incorrect");
        return false;
    } else if (!(inputPW.value && password)) {
        alert("Password incorrect");
        return false;
    }
    return true;
}

function validateLogin(userArr) {
    for (const user of userArr) {
        if (user.username === inputUN.value) username = true;
        if (user.password === inputPW.value) password = true;
    }
    return false;
}
