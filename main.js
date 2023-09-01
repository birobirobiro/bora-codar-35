// Obter os elementos de input do tipo range e seus respectivos elementos de output
const metaDiariaInput = document.getElementById("dailyGoal");
const metaDiariaOutput = document.getElementById("dailyGoalValue");
const quantidadeInput = document.getElementById("dailyQuantity");
const quantidadeOutput = document.getElementById("quantityValue");

let totalGlassesTaken = -1
function calculate() {
  const TIME_AWAKE_IN_MINUTES = 960 // equivalente a 16h acordado
  const totalGlassesOfWater = Number(metaDiariaInput.value / quantidadeInput.value)
  const totalTimerInMinutes = TIME_AWAKE_IN_MINUTES / totalGlassesOfWater
  const [hour, minutes] = [Math.floor(totalTimerInMinutes / 60), Math.floor(totalTimerInMinutes % 60)]

  const percentageOfTotalGlassesTaken = 
    Math.abs((totalGlassesTaken * 100 / totalGlassesOfWater) - 100) + '%'
  
  return {
    canTakeWater: totalGlassesTaken + 1 <= totalGlassesOfWater,
    hour,
    minutes,
    percentageOfTotalGlassesTaken
  }  
}

// Atualizar o output da meta diária quando o input do tipo range mudar
metaDiariaInput.addEventListener("input", function () {
  metaDiariaOutput.textContent = `${metaDiariaInput.value}ml`;
  updateHourAndMinutesDisplay()
});

// Atualizar o output da quantidade quando o input do tipo range mudar
quantidadeInput.addEventListener("input", function () {
  quantidadeOutput.textContent = `${quantidadeInput.value}ml`;
  updateHourAndMinutesDisplay()
});

// Obter os elementos do contador

const horasElemento = document.querySelector(".countdown .hours span");
const minutosElemento = document.querySelector(".countdown .minutes span");

function updateHourAndMinutesDisplay() {
  const {hour, minutes} = calculate()
  horasElemento.textContent = hour
  minutosElemento.textContent = minutes
}

updateHourAndMinutesDisplay()

// start counter 
let isCounting = false, timer;

function countdown() {
  clearInterval(timer)
  if(!isCounting) return

  const { canTakeWater } = calculate()
  if(!canTakeWater) return
  
  let newHour = horasElemento.textContent,
  newMinutes = Number(minutosElemento.textContent) - 1
  
  if(newMinutes < 0) {
    newMinutes = 59
    newHour = Number(horasElemento.textContent) - 1 
  }

  if(newHour < 0) {
    clearInterval(timer)
    isCounting = false;
    openModal()
    return
  }

  horasElemento.textContent = newHour
  minutosElemento.textContent = newMinutes

  timer = setInterval(() => { countdown() }, 10)
}

const startButton = document.getElementById('start')
startButton.addEventListener('click', () => {
  if(isCounting) return
  
  isCounting = true;
  countdown()
})


// Modal
const modalContainer = document.querySelector('.modalContainer')
const closeButton = document.getElementById('close')

closeButton.addEventListener('click', closeModal)

function closeModal() {
  modalContainer.style.display = 'none'
  isCounting = true
  updateHourAndMinutesDisplay()
  countdown()
  updatePercentageDisplay()
}

function openModal() {
  isCounting = false;
  modalContainer.style.display = 'block'
}

function updatePercentageDisplay() {
  totalGlassesTaken++
  const { percentageOfTotalGlassesTaken } = calculate()
  
  const percentageDisplay = document.getElementById('percentage')
  percentageDisplay.textContent = percentageOfTotalGlassesTaken
}
updatePercentageDisplay()