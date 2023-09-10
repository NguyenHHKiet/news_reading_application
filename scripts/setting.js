"use strict";

const userObj = JSON.parse(getFromStorage("currentUser")) || undefined;
const currentUser = new User(userObj);

const btnSubmit = document.getElementById("btn-submit");
const inputCategory = document.getElementById("input-category");
const inputPageSize = document.getElementById("input-page-size");

// window.localStorage.clear();

btnSubmit.addEventListener("click", () => {
    if (inputPageSize.value === "") {
        alert("Please input a query filled with!!");
        return;
    }
    if (currentUser) {
        const data = {
            pageSize: inputPageSize.value,
            category: inputCategory.value.toLowerCase(),
        };
        // setup page size & category of user
        currentUser.setSettings(data.pageSize, data.category);
        saveToStorage("currentUser", JSON.stringify(currentUser));
        // Notification
    } else {
        alert("Please login user");
        window.location.href = "../index.html";
    }
});
