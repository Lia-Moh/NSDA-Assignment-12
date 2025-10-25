// DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const clearAllBtn = document.getElementById("clear-all");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos in the list
function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    // ✅ Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", () => toggleComplete(index));

    // 📝 Task text
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.classList.add("task-text");
    if (todo.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "#777";
    }

    // 🗑️ Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });

    // Add all elements to list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateCount();
}

// Add new todo
function addTodo(text) {
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
}

// Delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Toggle completion status
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Update task counter
function updateCount() {
  taskCount.textContent = todos.length;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
  }
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  todos = [];
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();
