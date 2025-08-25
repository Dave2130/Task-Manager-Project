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

let tasks = [];
let idCounter = 1;

function addTask(title, priority) {
  let task = new Task(idCounter++, title, priority);
  tasks.push(task);
  renderTasks();
}

function removeTask(id) {
  const li = document.querySelector(`#task-${id}`);
  if (li) {
    li.classList.add("fade-out");
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }, 300); // wait for animation
  }
}

function toggleTask(id) {
  let task = tasks.find(t => t.id === id);
  if (task) task.markDone();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");
    li.id = `task-${task.id}`;
    if (task.completed) li.classList.add("done");

    let titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;

    let badge = document.createElement("span");
    badge.classList.add("priority", task.priority.toLowerCase());
    badge.textContent = task.priority;

    let doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "✔ Done" : "Mark Done";
    doneBtn.onclick = () => toggleTask(task.id);

    let delBtn = document.createElement("button");
    delBtn.textContent = "🗑 Delete";
    delBtn.onclick = () => removeTask(task.id);

    li.appendChild(titleSpan);
    li.appendChild(badge);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

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
