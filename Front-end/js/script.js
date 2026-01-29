// Seleciona o corpo da tabela
const tBody = document.querySelector("tbody");
// Seleciona o formulário de adicionar tarefa
const addForm = document.querySelector(".add-form");
// Seleciona o input de texto da tarefa
const inputTask = document.querySelector(".input-task");

// Função de busca das tasks
const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");
  const tasks = await response.json();
  return tasks;
};

// Função adicionar task
const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch("http://localhost:3333/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = "";
};

// Função para remover a task
const removeTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

// Função de atualizar a task
const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

// Função para formatar a data
const formatDate = (dateUTC) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);

  return date;
};

// Função que cria elementos HTML
const createElement = (tag, innerText = "", innerHTML = "") => {
  const elemento = document.createElement(tag);
  if (innerText) {
    elemento.innerText = innerText;
  }
  if (innerHTML) {
    elemento.innerHTML = innerHTML;
  }

  return elemento;
};

// Função que cria o select de status
const createSelect = (value) => {
  const options =
    "<option value='pendente'>pendente</option><option value='em progresso'>em progresso</option><option value='concluido'>concluido</option>";

  const select = createElement("select", "", options);

  select.value = value;

  return select;
};

// Função que cria a linha da tabela
const createRow = (task) => {

const { _id: id, title, created_at, status } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdcreactedAt = createElement("td", formatDate(created_at));
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const select = createSelect(status);

  // Atualiza status ao selecionar uma nova opção
  select.addEventListener("change", ({ target }) =>
    updateTask({ id, title, status: target.value })
  );

  const editButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'> edit </span>"
  );
  const deleteButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'> delete </span>"
  );

  const editForm = createElement("form");
  const editInput = createElement("input");
  // Criamos um botão de submit escondido para o "Enter" funcionar sempre
  const hiddenSubmit = createElement("button");
  hiddenSubmit.type = "submit";
  hiddenSubmit.style.display = "none";

  editInput.value = title;
  editForm.appendChild(editInput);
  editForm.appendChild(hiddenSubmit); // O formulário agora tem um gatilho de submit
  
  // Atualiza título ao submeter o form
  editForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  // Garantimos que o id seja o _id do Mongo
  await updateTask({ id, title: editInput.value, status });
  // Opcional: recarregar as tasks para mostrar o novo título
  loadTasks();});

  // Ao clicar no botão de editar, mostra o input
  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
    editInput.focus();
  });

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  // Ao clicar no botão de deletar, remove a task
  deleteButton.addEventListener("click", () => {
    removeTask(id);
  });

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tdStatus.appendChild(select);

  tr.appendChild(tdTitle);
  tr.appendChild(tdcreactedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

// Função que irá buscar as tasks no banco de dados e carregar na tela
const loadTasks = async () => {
  const tasks = await fetchTasks();

  tBody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tBody.appendChild(tr);
  });
};

// Evento que adiciona a task ao submeter o formulário
addForm.addEventListener("submit", addTask);
// Carrega as tasks ao iniciar
loadTasks();
