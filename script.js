const localStoragekey = "to-do-list-pv"; // criando uma var que armazena o nome da caixinha onde vamos armazenar X info.
let input = document.getElementById("ipt_newTask");

function validateIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
  let inputValue = document.getElementById("ipt_newTask").value;
  let exists = values.find((x) => x.name == inputValue);

  return !exists ? false : true; // if else compactado (? -> "Então..."/ : -> "Senão...")
}

function newTask() {
  // validação
  if (!input.value) {
    alert("Digite algo para poder inserir na sua lista");
  } else if (validateIfExistsNewTask()) {
    alert("Já existe uma task com essa descrição");
  } else {
    // parse -> serve para traduzir para string, pois o localStorage so consegue guardar texto puro ('strings')
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]"); // ta pegando os dados armazenados nessa caixinha, ou retorne uma lista vazia ([])
    // depois guarda tudo isso dentro da variável (values)

    values.push({
      name: input.value,
    });

    localStorage.setItem(localStoragekey, JSON.stringify(values)); // guarda as infos na caixinha que criamos o nome la encima  ('to-do-list-pv')

    showValues();
  }
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
  let list = document.getElementById("to--do--list");

  list.innerHTML = "";

  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i].name}<button id="btn-ok" onclick="removeItem('${values[i].name}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`;
  }

  input.value = "";
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);

  localStorage.setItem(localStoragekey, JSON.stringify(values));
  showValues();
}

showValues();
