// Keep track of tasks and unique IDs
let tasks = [];
let idCounter = 1;

// Task class
class Task {
  constructor(id, title, priority = "low") {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.completed = false;
  }

  markDone() {
    this.completed = true;
  }
}

// Add task
function addTask(title, priority) {
  let task = new Task(idCounter++, title, priority);
  tasks.push(task);
  renderTasks();
}

// Remove task
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Toggle task as done
function toggleTask(id) {
  let task = tasks.find(t => t.id === id);
  if (task) task.markDone();
  renderTasks();
}

// Edit task (inline editing)
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const li = document.getElementById(`task-${id}`);
  li.innerHTML = ""; // Clear the task display

  let input = document.createElement("input");
  input.type = "text";
  input.value = task.title;
  input.style.marginRight = "10px";

  let saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.classList.add("btn-save");
  saveBtn.title = "Save";
  saveBtn.onclick = () => {
    if (input.value.trim() !== "") {
      task.title = input.value.trim();
      renderTasks();
    }
  };

  let cancelBtn = document.createElement("button");
  cancelBtn.textContent = "✖";
  cancelBtn.classList.add("btn-cancel");
  cancelBtn.title = "Cancel";
  cancelBtn.onclick = () => renderTasks();

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
}

// Render tasks to UI
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");
    li.id = `task-${task.id}`;
    if (task.completed) li.classList.add("done");

    let titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;
    titleSpan.classList.add("task-title");

    let badge = document.createElement("span");
    badge.textContent = `(${task.priority})`;
    badge.classList.add("task-badge");

    // Actions
    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.title = "Mark as Done";
    doneBtn.onclick = () => toggleTask(task.id);

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.title = "Edit Task";
    editBtn.onclick = () => editTask(task.id);

    let delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.classList.add("btn-delete");
    delBtn.title = "Delete Task";
    delBtn.onclick = () => removeTask(task.id);

    actionsDiv.appendChild(doneBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(delBtn);

    li.appendChild(titleSpan);
    li.appendChild(badge);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });
}

// Add Task button event
document.getElementById("addBtn").addEventListener("click", () => {
  const title = document.getElementById("taskInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (title.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  addTask(title, priority);
  document.getElementById("taskInput").value = "";
});

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.textContent = "🌞";
  } else {
    toggleBtn.textContent = "🌙";
  }
});
