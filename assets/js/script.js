const localStorageKey = 'ToDoListGN';

function validateIfExistNewTask() {
  const values = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  const inputValue = document.getElementById('inputNewTask').value.trim();
  return values.some(x => x.name === inputValue);
}

function newTask() {
  const input = document.getElementById('inputNewTask');
  input.style.border = '';

  // Validação
  if (!input.value.trim()) {
    input.style.border = '1px solid red';
    alert('Digite algo para inserir em sua lista');
  } else if (validateIfExistNewTask()) {
    alert('Já existe essa tarefa na lista.');
  } else {
    // Adicionar nova tarefa ao localStorage
    const task = {
      name: input.value.trim(),
    };

    let values = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    values.push(task);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
}

function showValues() {
  const values = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const list = document.getElementById('listaJs');
  list.innerHTML = '';

  values.forEach(task => {
    list.innerHTML += `
      <li>${task.name}
        <button id="btn-ok" onclick="removeItem('${task.name}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
        </button>
      </li>
    `;
  });
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  const index = values.findIndex(x => x.name === data);
  if (index !== -1) {
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
}

//chamamando a função aqui fora para a lista estar sempre atualizada.
showValues();

// Aprenda como criar um TO-DO LIST com HTML, CSS e JavaScript > Gustavo Neitzke > 
// https://www.youtube.com/watch?v=MxP4jZQY0h4&t=3s&ab_channel=GustavoNeitzke
// Implementação minha foi apenas o trim(), oque faz com que o usuario não possa preencher apenas espaços brancos no input.
