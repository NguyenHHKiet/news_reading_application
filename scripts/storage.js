"use strict";

// do save to LocalStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

// get data from LocalStorage with corresponding Key
function getFromStorage(key) {
    return localStorage.getItem(key);
}
