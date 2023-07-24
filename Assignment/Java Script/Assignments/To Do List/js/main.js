let tasks = [];
function addTask() {
  let task = document.getElementById("userInput").value;
  tasks.push(task);
  showTasks();
  clear();
}
function showTasks() {
  let str = ``;
  for (let i = 0; i < tasks.length; i++) {
    str += `
    <div class="home-item mb-2 px-3  text-dark mx-auto w-25 bg-white d-flex justify-content-between align-items-center">
    <p id="x">${tasks[i]}</p>
    <i class=" fa-sharp fa-solid fa-trash" onclick="deleteItem(${i})" ></i>
</div>
    `;
  }
  document.getElementById("homeContent").innerHTML = str;
}
function clear() {
  document.getElementById("userInput").value = "";
}
function deleteItem(index) {
  tasks.splice(index, 1);
  showTasks();
}
