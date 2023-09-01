// Obter os elementos de input do tipo range e seus respectivos elementos de output
const metaDiariaInput = document.getElementById("dailyGoal");
const metaDiariaOutput = document.getElementById("dailyGoalValue");
const quantidadeInput = document.getElementById("dailyQuantity");
const quantidadeOutput = document.getElementById("quantityValue");

// Atualizar o output da meta diária quando o input do tipo range mudar
metaDiariaInput.addEventListener("input", function () {
  metaDiariaOutput.textContent = `${metaDiariaInput.value}ml`;
});

// Atualizar o output da quantidade quando o input do tipo range mudar
quantidadeInput.addEventListener("input", function () {
  quantidadeOutput.textContent = `${quantidadeInput.value}ml`;
});

// Obter os elementos do contador
const horasElemento = document.querySelector(".countdown .hours span");
const minutosElemento = document.querySelector(".countdown .minutes span");

// Variáveis para controlar o contador
let metaDiaria = parseInt(metaDiariaInput.value);
let quantidade = parseInt(quantidadeInput.value);
let contador = 0;

// Função para atualizar o contador com base na meta diária e quantidade
function atualizarContador() {
  // Calcular o número de minutos para a meta diária
  const totalMinutos = Math.floor(metaDiaria / quantidade) * 60;

  // Calcular o número de horas e minutos restantes
  const horasRestantes = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;

  // Atualizar os elementos do contador
  horasElemento.textContent = horasRestantes.toString().padStart(2, "0");
  minutosElemento.textContent = minutosRestantes.toString().padStart(2, "0");
}

// Função para exibir o modal quando chegar a hora de beber a próxima quantidade de água por timer
function exibirModal() {
  const modalContainer = document.querySelector(".modalContainer");
  const modal = document.querySelector(".modal");

  // Exibir o modal
  modalContainer.style.display = "flex";
  modal.querySelector("span").textContent = "Lembrete para beber água!";

  // Atualizar o contador
  contador++;

  // Verificar se já atingiu a meta diária
  if (contador * quantidade >= metaDiaria) {
    modal.querySelector("span").textContent = "Meta diária atingida!";
    contador = 0;
  }
}

// Chamar a função atualizarContador inicialmente e sempre que os inputs do tipo range mudarem
atualizarContador();
metaDiariaInput.addEventListener("input", function () {
  metaDiaria = parseInt(metaDiariaInput.value);
  atualizarContador();
});
quantidadeInput.addEventListener("input", function () {
  quantidade = parseInt(quantidadeInput.value);
  atualizarContador();
});

// Obter o botão de iniciar
const botaoIniciar = document.getElementById("start");

// Função para iniciar o contador e exibir o modal quando chegar a hora de beber a próxima quantidade de água por timer
function iniciarContador() {
  setInterval(exibirModal, quantidade * 60 * 1000);
}

// Iniciar o contador quando o botão de iniciar for clicado
botaoIniciar.addEventListener("click", iniciarContador);