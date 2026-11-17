# Ex03 To-Do List using JavaScript
## Date:17/11/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
index.html
```
<!DOCTYPE html>
<html>
<head>
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>My Todo List</h1>
        <p>Manage your daily tasks easily!</p>

        <div class="input-section">
            <input type="text" id="taskInput"
            placeholder="Enter your task">

            <button onclick="addTask()">Add Task</button>
        </div>

        <input type="text" id="searchInput"
        placeholder="Search tasks..." oninput="displayTasks()">

        <div class="filters">
            <button onclick="setFilter('all')">All</button>
            <button onclick="setFilter('active')">Active</button>
            <button onclick="setFilter('completed')">Completed</button>
        </div>

        <ul id="taskList"></ul>

        <div class="footer">
            <span id="taskCount">0 tasks left</span>
            <button onclick="clearCompleted()">
                Clear Completed
            </button>
        </div>

    </div>

    <script src="script.js"></script>

</body>
</html>
```
style.html
```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    width: 450px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
}

p {
    text-align: center;
    color: gray;
    margin-bottom: 25px;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    outline: none;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background: #667eea;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #4b5fc5;
}

#searchInput {
    margin-bottom: 15px;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

#taskList {
    list-style: none;
}

#taskList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 5px;
    gap: 8px;
}

.task-text {
    flex: 1;
    overflow-wrap: anywhere;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.actions {
    display: flex;
    gap: 5px;
}

.edit {
    background: orange;
}

.delete {
    background: red;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
}

.footer button {
    background: #e74c3c;
}
```
script.js
```
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Add Task
function addTask() {

    let input = document.getElementById("taskInput");

    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}

// Display Tasks
function displayTasks() {

    let taskList = document.getElementById("taskList");

    let search = document.getElementById("searchInput")
    .value.toLowerCase();

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        let matchesSearch = task.name.toLowerCase()
        .includes(search);

        let matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;

    });

    filteredTasks.forEach(task => {

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.textContent = task.name;

        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => toggleTask(task.id);

        let actions = document.createElement("div");

        actions.className = "actions";

        let editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.className = "edit";

        editBtn.onclick = () => editTask(task.id);

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete";

        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(editBtn);

        actions.appendChild(deleteBtn);

        li.appendChild(span);

        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateCount();
}

// Complete Task
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();

    displayTasks();
}

// Edit Task
function editTask(id) {

    let task = tasks.find(task => task.id === id);

    let newName = prompt("Edit your task:", task.name);

    if (newName !== null && newName.trim() !== "") {

        task.name = newName.trim();

        saveTasks();

        displayTasks();
    }
}

// Delete Task
function deleteTask(id) {

    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();
}

// Filter Tasks
function setFilter(filter) {

    currentFilter = filter;

    displayTasks();
}

// Clear Completed Tasks
function clearCompleted() {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    displayTasks();
}

// Update Task Count
function updateCount() {

    let count = tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").textContent =
    count + " tasks left";
}

// Save Tasks in Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Initial Display
displayTasks();
```
## OUTPUT
![alt text](<Screenshot 2026-11-17 164925.png>)
![alt text](<Screenshot 2026-11-17 165007.png>)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
