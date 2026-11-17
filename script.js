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