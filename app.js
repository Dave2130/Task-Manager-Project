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

  toString() {
    return `${this.title} [${this.priority}] - ${this.completed ? "✅ Done" : "❌ Pending"}`;
  }
}

// Data structure
let tasks = [];
let idCounter = 1;
let filterMode = "all";
let searchQuery = "";

// Functions
function addTask(title, priority) {
  let task = new Task(idCounter++, title, priority);
  tasks.push(task);
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleTask(id) {
  let task = tasks.find(t => t.id === id);
  if (task) task.markDone();
  renderTasks();
}

function sortTasks() {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  renderTasks();
}

function filterTasks(list) {
  if (filterMode === "done") {
    list = list.filter(task => task.completed);
  } else if (filterMode === "pending") {
    list = list.filter(task => !task.completed);
  }
  if (searchQuery.trim() !== "") {
    list = list.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return list;
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let displayTasks = filterTasks(tasks);

  displayTasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task.toString();

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Mark Done";
    doneBtn.onclick = () => toggleTask(task.id);

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => removeTask(task.id);

    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Async save simulation
async function saveTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Tasks saved:", tasks);
      resolve("Tasks saved to server ✅");
    }, 1000);
  });
}

// Events
document.getElementById("addBtn").addEventListener("click", async () => {
  const title = document.getElementById("taskInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (title.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  addTask(title, priority);
  document.getElementById("taskInput").value = "";

  let msg = await saveTasks();
  console.log(msg);
});

document.getElementById("sortBtn").addEventListener("click", sortTasks);
document.getElementById("filterAll").addEventListener("click", () => { filterMode = "all"; renderTasks(); });
document.getElementById("filterDone").addEventListener("click", () => { filterMode = "done"; renderTasks(); });
document.getElementById("filterPending").addEventListener("click", () => { filterMode = "pending"; renderTasks(); });

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderTasks();
});
