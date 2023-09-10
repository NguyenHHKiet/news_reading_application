"use strict";

const KEY = "todoArr";
const todoArr = JSON.parse(getFromStorage(KEY)) || [];
const { username } = JSON.parse(getFromStorage("currentUser")) || undefined;
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");

let todoList = document.getElementById("todo-list");
let todoListChild = todoList.childNodes;

renderToDoList(todoArr);
isDoneTask(todoArr);

let closeAllTask = document.querySelectorAll(".close");
closeTask(todoArr);

function closeTask(todoArr) {
    for (let index = 0; index < todoArr.length; index++) {
        const element = closeAllTask[index];
        element.onclick = function () {
            // find the element that is currently clicked
            const foundIndex = todoArr.findIndex(
                (item) =>
                    `${item.task}×` ===
                    this.parentNode.textContent.split("×")[0]
            );
            todoArr.splice(foundIndex, 1);
            todoList.removeChild(this.parentNode);
            saveToStorage(KEY, JSON.stringify(todoArr));
        };
    }
}

// take events from btnAdd
btnAdd.addEventListener("click", () => {
    if (!username) {
        alert("You are not logged into the app");
        location.href = "../index.html";
    } else if (!inputTask.value) {
        alert("Input task is required");
        return;
    } else {
        const data = {
            task: inputTask.value,
            owner: username,
            isDone: false,
        };
        const todo = new Task(data);
        todoArr.push(todo);

        // empty tasks for rendering new list
        todoList.innerHTML = "";

        saveToStorage(KEY, JSON.stringify(todoArr));
        inputTask.value = "";
        todoList = document.getElementById("todo-list");
        todoListChild = todoList.childNodes;

        renderToDoList(todoArr);
        isDoneTask(todoArr);
    }
});

// render todo list
function renderToDoList(todoArr) {
    const filterList = todoArr.filter((todo) => todo.owner === username);
    for (const todo of filterList) {
        const li = document.createElement("li");
        if (todo.isDone) li.classList.add("checked");
        li.innerHTML = `${todo.task}<span class="close">×</span>`;
        todoList.appendChild(li);
    }
}

// render & check the task list are done
function isDoneTask(todoArr) {
    for (let index = 0; index < todoListChild.length; index++) {
        const element = todoListChild[index];
        if (!todoArr[index].isDone) {
            element.onclick = function () {
                this.classList.add("checked");
                todoArr[index].isDone = true;
                saveToStorage(KEY, JSON.stringify(todoArr));
            };
        }
    }
}
