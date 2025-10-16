// Select elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Handle form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTaskToList(taskText);
  saveTaskToStorage(taskText);
  taskInput.value = "";
  updateTaskCount();
});

// Add a single task to the list
function addTaskToList(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.remove();
    deleteTaskFromStorage(taskText);
    updateTaskCount();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Update task count
function updateTaskCount() {
  taskCount.textContent = taskList.getElementsByTagName("li").length;
}

// Save task to localStorage
function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks array from localStorage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load all tasks on startup
function loadTasksFromStorage() {
  const tasks = getTasksFromStorage();
  tasks.forEach(addTaskToList);
  updateTaskCount();
}

// Delete task from localStorage
function deleteTaskFromStorage(taskToDelete) {
  const tasks = getTasksFromStorage().filter(task => task !== taskToDelete);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
