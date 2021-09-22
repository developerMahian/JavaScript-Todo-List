/* =======================
Selectors >>>>>>>>>>>>>>>
======================= */
let userInput = document.querySelector(".new-todo input");
let userSubmit = document.querySelector(".new-todo button");
let userSubmitIcon = document.querySelector(".new-todo button i"); // only for the plus Icon opacity effect..
let todoList = document.querySelector(".todo-list");
let pendingTodo = document.querySelector(".pending-num");
let resetTodo = document.querySelector(".reset-todo");
let clearTodo = document.querySelector(".clear-todo");


/* =======================
Event Listeners >>>>>>>>>
======================= */
userSubmit.addEventListener('click', newTodo);
todoList.addEventListener('click', delCheckTodo);
resetTodo.addEventListener('click', resetTodoList);
clearTodo.addEventListener('click', clearTodoList);


/* =======================
Functions >>>>>>>>>>>>>>>
======================= */
// Add Button activeness indicator....
userInput.onkeyup = () => {
  (userInput.value.trim() != 0) ? userSubmitIcon.classList.add("action"): userSubmitIcon.classList.remove("action");
}

// Adding new todo list....
function newTodo(e) {
  e.preventDefault(); // Preventing form submitting..  
  if (userInput.value !== "") { // Adding todo if input exists..
    createListEl();
    userInput.value = ""; // Reset input field..
    remainingTodos();
  }
}

// Function for creating the new todo list....
function createListEl() {
  // create list item and assign input value..
  const li = document.createElement("li");
  li.textContent = userInput.value;

  // create span element..
  const spanEl = document.createElement("span");

  // create & add done icon to span..
  const doneIcon = document.createElement("i");
  doneIcon.classList.add("fas", "fa-check-circle", "todo-done-icon");
  spanEl.appendChild(doneIcon);

  // create & add delete icon to span..
  const DelIcon = document.createElement("i");
  DelIcon.classList.add("fas", "fa-trash", "todo-delete-icon");
  spanEl.appendChild(DelIcon);

  // add span to li element..
  li.appendChild(spanEl);

  // add li to ul element..
  todoList.appendChild(li);
}

// Deleting or Checking a todo list....
function delCheckTodo(e) {
  const item = e.target;
  // deleting <li>..
  if (item.classList[2] === "todo-delete-icon") {
    var itemParent = item.parentElement.parentElement; // <i> isn't direct child of <li>..
    itemParent.classList.add("del-transition");
    // delete element after animation ends..
    itemParent.addEventListener("transitionend", () => {
      itemParent.remove();
      remainingTodos();
    })
  }
  // checking <li>..
  if (item.classList[2] === "todo-done-icon") {
    item.parentElement.parentElement.classList.toggle("done");
  }
}

// Counting not deleted todo lists....
function remainingTodos() {
  let listsArray = document.querySelectorAll("li");  
  pendingTodo.textContent = listsArray.length;
}

// Reset the list....
function resetTodoList() {
  location.reload();
}

// Delete the entire list....
function clearTodoList() {
  todoList.remove();  
}