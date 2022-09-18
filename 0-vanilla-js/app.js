const form = document.querySelector('.form');
let todoInput = document.getElementById('todo-input');
let submitBtn = document.getElementById('submit-btn');
const todoList = document.querySelector('.todo-list');
const clearListBtn = document.querySelector('.clear-list');

// Initial Setup ===========================================
let isEditing = false;
let editEl = '';
let editElID = '';
submitBtn.textContent = 'Add';
todoInput.value = '';

function initialSetup() {
  isEditing = false;
  editEl = '';
  editElID = '';
  submitBtn.textContent = 'Add';
  todoInput.value = '';
}

// localStorage ============================================
function getLocalStorage() {
  return localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList'))
    : [];
}

function addTodoToLocalStorage(id, value) {
  const todoList = getLocalStorage();
  todoList.push({ id, value });
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function updateTodoInLocalStorage(id, newValue) {
  const todoList = getLocalStorage();
  const updatedTodoList = todoList.map((todo) =>
    todo.id === id ? { ...todo, value: newValue } : todo
  );
  localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
}

function removeTodoFromLocalStorage(id) {
  const todoList = getLocalStorage();
  const newTodoList = todoList.filter((todo) => todo.id !== id);
  localStorage.setItem('todoList', JSON.stringify(newTodoList));
}

// FORM SUBMIT =============================================
function submitFormHandler(e) {
  e.preventDefault();
  const id = crypto.randomUUID();

  if (todoInput.value && !isEditing) {
    createListItem(id, todoInput.value);
    addTodoToLocalStorage(id, todoInput.value);
    initialSetup();
  } else if (todoInput.value && isEditing) {
    editEl.innerHTML = todoInput.value;
    updateTodoInLocalStorage(editElID, todoInput.value);
    initialSetup();
  } else {
    return alert('Cannot be blank');
  }
}

// Functions ===============================================
function clearList() {
  todoList.innerHTML = '';
  localStorage.removeItem('todoList');
  initialSetup();
}

function loadLocalStorageTodoList() {
  const todoList = getLocalStorage();
  todoList.forEach((todo) => createListItem(todo.id, todo.value));
}

function createListItem(id, value) {
  let todoItem = document.createElement('li');
  todoItem.classList.add('todo__item');
  todoItem.dataset.id = id;
  todoItem.innerHTML = `
        <p class="todo__item-title">${value}</p>
        <div class="todo__item-actions">
          <button type="button" class="complete-btn">Complete</button>
          <button type="button" class="edit-btn">Edit</button>
          <button type="button" class="delete-btn">Delete</button>
        </div>
  `;

  todoList.append(todoItem);

  const completeBtn = todoItem.querySelector('.complete-btn');
  const editBtn = todoItem.querySelector('.edit-btn');
  const deleteBtn = todoItem.querySelector('.delete-btn');

  completeBtn.addEventListener('click', completeTodoHandler);
  editBtn.addEventListener('click', editTodoHandler);
  deleteBtn.addEventListener('click', deleteTodoHandler);
}

function completeTodoHandler(e) {
  const todoItemTitle = e.target.closest('.todo__item').firstElementChild;
  if (!isEditing) {
    todoItemTitle.classList.toggle('completed');
  }
}

function editTodoHandler(e) {
  isEditing = true;
  submitBtn.textContent = 'Edit';

  const todoItem = e.target.closest('.todo__item');
  const todoTitle = todoItem.querySelector('.todo__item-title');
  const { id } = todoItem.dataset;

  editEl = todoTitle;
  editElID = id;
  todoInput.value = todoTitle.innerHTML;
}

function deleteTodoHandler(e) {
  const todoItem = e.target.closest('.todo__item');
  const { id } = todoItem.dataset;

  if (!isEditing) {
    todoList.removeChild(todoItem);
    removeTodoFromLocalStorage(id);
    initialSetup();
  }
}

// Event Listeners ==================================
clearListBtn.addEventListener('click', clearList);
form.addEventListener('submit', submitFormHandler);
window.addEventListener('DOMContentLoaded', loadLocalStorageTodoList);
