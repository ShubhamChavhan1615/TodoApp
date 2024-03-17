console.log("hello");
const tasks = document.getElementById("tasks");
const inputBox = document.getElementById("inputBox");
const btn = document.querySelector(".btn");

// Load tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach(function (task) {
            addTask(task);
        });
    }
});

const addTask = (taskText) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = taskText;

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("editBtn");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("deleteBtn");

    li.appendChild(p);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    tasks.appendChild(li);
};

const addTodo = () => {
    const taskText = inputBox.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        inputBox.value = "";

        // Store tasks in local storage
        updateLocalStorage();
    }
};

const editTodo = (e) => {
    if (e.target.classList.contains("editBtn")) {
        const p = e.target.parentElement.querySelector("p");
        const newText = prompt("Enter new task text:", p.innerHTML);
        if (newText !== null) {
            p.innerHTML = newText;
            // Update local storage after editing a task
            updateLocalStorage();
        }
    } else if (e.target.classList.contains("deleteBtn")) {
        tasks.removeChild(e.target.parentElement);
        // Update local storage after deleting a task
        updateLocalStorage();
    }
};

const updateLocalStorage = () => {
    const tasksArray = Array.from(tasks.querySelectorAll("p")).map((p) => p.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

btn.addEventListener("click", addTodo);
tasks.addEventListener("click", editTodo);
