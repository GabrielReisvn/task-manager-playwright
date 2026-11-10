const loginForm = document.querySelector('#login-form');
const loginSection = document.querySelector('#loginSection');
const appSection = document.querySelector('#appSection');
const loginError = document.querySelector('#login-error');
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const formError = document.querySelector('#formError');
const titleInput = document.querySelector('#task-title');
const descriptionInput = document.querySelector('#task-description');
const priorityInput = document.querySelector('#task-priority');
const filterInput = document.querySelector('#status-filter');

let tasks = [];
let editingId = null;

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value;
  if (username === 'aluno' && password === 'playwright123') {
    loginError.textContent = '';
    document.querySelector('#welcomeName').textContent = username;
    loginSection.hidden = true;
    appSection.hidden = false;
    renderTasks();
  } else {
    loginError.textContent = 'Usuário ou senha incorretos.';
  }
});

document.querySelector('#logout-button').addEventListener('click', () => {
  appSection.hidden = true;
  loginSection.hidden = false;
  loginForm.reset();
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    formError.textContent = 'O título é obrigatório.';
    return;
  }
  formError.textContent = '';
  const taskData = {
    title,
    description: descriptionInput.value.trim(),
    priority: priorityInput.value,
    completed: false
  };
  if (editingId !== null) {
    const task = tasks.find(item => item.id === editingId);
    Object.assign(task, taskData);
    editingId = null;
    document.querySelector('#form-title').textContent = 'Adicionar tarefa';
  } else {
    tasks.push({ id: Date.now(), ...taskData });
  }
  taskForm.reset();
  renderTasks();
});

filterInput.addEventListener('change', renderTasks);

function renderTasks() {
  taskList.innerHTML = '';
  const filtered = tasks.filter(task => {
    if (filterInput.value === 'Concluída') return task.completed;
    if (filterInput.value === 'Pendente') return !task.completed;
    return true;
  });

  filtered.forEach(task => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' done' : ''}`;
    item.dataset.testid = 'task-item';
    item.innerHTML = `
      <div class="task-name" data-testid="task-name"></div>
      <p class="task-description"></p>
      <small>Prioridade: <span class="task-priority"></span></small>
      <div class="task-actions">
        <button type="button" class="complete">Concluir</button>
        <button type="button" class="edit secondary">Editar</button>
        <button type="button" class="delete">Excluir</button>
      </div>`;
    item.querySelector('.task-name').textContent = task.title;
    item.querySelector('.task-description').textContent = task.description;
    item.querySelector('.task-priority').textContent = task.priority;
    item.querySelector('.complete').textContent = task.completed ? 'Reabrir' : 'Concluir';
    item.querySelector('.complete').addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    item.querySelector('.edit').addEventListener('click', () => {
      editingId = task.id;
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      priorityInput.value = task.priority;
      document.querySelector('#form-title').textContent = 'Editar tarefa';
      titleInput.focus();
    });
    item.querySelector('.delete').addEventListener('click', () => {
      tasks = tasks.filter(entry => entry.id !== task.id);
      renderTasks();
    });
    taskList.appendChild(item);
  });

  document.querySelector('[data-testid="total-count"]').textContent = tasks.length;
  document.querySelector('[data-testid="completed-count"]').textContent = tasks.filter(task => task.completed).length;
  emptyState.hidden = filtered.length !== 0;
}