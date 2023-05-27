const localStorageKey = 'ToDoListGN'

function validateIfExistNewTask(){
    let values     = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    let inputValue = document.getElementById('inputNewTask').value.trim();
    let exists     = values.find(x => x.name === inputValue)
    return !exists ? false : true
}

function newTask(){
    let input = document.getElementById('inputNewTask')
    input.style.border = '';
    //validation
    if(!input.value.trim()){
        input.style.border = '1px solid red';
        alert('digite algo para inserir em sua lista');
    } else if(validateIfExistNewTask()){
        alert('Já existe essa tarefa na lista.')
    }else {
        //increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = '';
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey)) || '[]';
    let list = document.getElementById('listaJs');
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i] ['name']}<button id='btn-ok' onclick='removeItem("${values[i] ['name']}")'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    let index = values.findIndex(x => x.name == data);
    if (index !== -1) {
      values.splice(index, 1);
      localStorage.setItem(localStorageKey, JSON.stringify(values));
       //em cima ta deletando de acordo com o index, e em baixo ta chamando a função de novo para atualizar a lista na  tela.
      showValues();
    }
  }

//chamamando a função aqui fora para a lista estar sempre atualizada.
showValues();

// Aprenda como criar um TO-DO LIST com HTML, CSS e JavaScript > Gustavo Neitzke > 
// https://www.youtube.com/watch?v=MxP4jZQY0h4&t=3s&ab_channel=GustavoNeitzke
// Implementação minha foi apenas o trim(), oque faz com que o usuario não possa preencher apenas espaços brancos no input.
