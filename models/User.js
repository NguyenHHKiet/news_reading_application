"use strict";

class User {
    constructor({ firstName, lastName, username, password }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    sayHello() {
        return `Hello, ${this.username}!`;
    }

    setSettings(pageSize = 5, category = "business") {
        this.pageSize = pageSize;
        this.category = category;
    }
}
