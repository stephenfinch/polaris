let game, banner
const menuAudio = new Audio(`assets/audio/menu${Math.round(Math.random(2)) + 1}.mp3`)
const soundtrack = new Audio(`assets/audio/soundtrack${Math.round(Math.random(2)) + 1}.mp3`)
const gameOverAudio = new Audio('assets/audio/gameOver.mp3')
const errorLog = []

function setup() {
  createCanvas(windowWidth, windowHeight)

  if (!localStorage.getItem('highestWave')) {
    localStorage.setItem('highestWave', 1)
  }

  if (!localStorage.getItem('polarisMusic')) {
    localStorage.setItem('polarisMusic', true)
  }

  if (!Number(localStorage.getItem('gameSpeed'))) {
    localStorage.setItem('gameSpeed', 1)
  }
  document.getElementById('game-speed').textContent = `Game Speed: ${localStorage.getItem('gameSpeed')}`

  if (!Number(localStorage.getItem('startingWave'))) {
    localStorage.setItem('startingWave', 1)
  }
  document.getElementById('starting-wave').textContent = `Starting Wave: ${localStorage.getItem('startingWave')}`

  game = new Game(getStartingCash(), Number(localStorage.getItem('startingWave')))
  noLoop()
}

function draw() {
  game.update()
  game.show()
}

function buyReload() {
  game.shop.buyReload()
}

function buyDamage() {
  game.shop.buyDamage()
}

function buyRange() {
  game.shop.buyRange()
}

window.addEventListener('DOMContentLoaded', (_event) => {
  const button = document.getElementById('full-screen')
  button.addEventListener('click', () => {
    toggleFullScreen()
  })
})

function handleBannerClick() {
  if (game.isOver) {
    game.clear()
    game = new Game(getStartingCash(), Number(localStorage.getItem('startingWave')))
  }

  game.start()
  playSound(soundtrack)
  loop()

  document.getElementById('banner').classList.add('banner-fade')
}

function openModal() {
  noLoop()
  playSound(menuAudio)
  document.getElementById('settings').classList.remove('hidden')
  document.getElementById('highest-wave').textContent = `Highest Wave: ${localStorage.getItem('highestWave')}`
  document.getElementById('starting-cash').textContent = `(starting cash: $${getStartingCash()})`
}

function closeSettings() {
  playSound(soundtrack)
  loop()
  document.getElementById('settings').classList.add('hidden')
}

function stopPropagation(event) {
  event.stopPropagation()
}

function toggleMusic() {
  localStorage.setItem('polarisMusic', !JSON.parse(localStorage.getItem('polarisMusic')))
  playSound(menuAudio)
}

function getStartingCash() {
  let cash = Number(localStorage.getItem('highestWave')) * 10

  for (let i = 1; i < Number(localStorage.getItem('startingWave')); i++) {
    cash += i * 3 + 2
  }

  return cash
}

function playSound(audio) {
  soundtrack.pause()
  menuAudio.pause()
  gameOverAudio.pause()

  if (JSON.parse(localStorage.getItem('polarisMusic'))) {
    audio.play()
    audio.loop = true
    audio.volume = 0.2
  }
}

window.onerror = (error, url, line) => {
  errorLog.push({ acc: 'error', data: 'ERR:' + error + ' URL:' + url + ' L:' + line })
}

function copyErrorLog() {
  navigator.clipboard.writeText(JSON.stringify(errorLog))
}

function minusGameSpeed() {
  if (Number(localStorage.getItem('gameSpeed')) > 0.25) {
    localStorage.setItem('gameSpeed', Number(localStorage.getItem('gameSpeed')) - 0.25)
    document.getElementById('game-speed').textContent = `Game Speed: ${localStorage.getItem('gameSpeed')}`
    document.getElementById('add-game-speed').removeAttribute('disabled')
  } else {
    document.getElementById('minus-game-speed').setAttribute('disabled', true)
  }
}

function addGameSpeed() {
  if (Number(localStorage.getItem('gameSpeed')) < 2.5) {
    localStorage.setItem('gameSpeed', Number(localStorage.getItem('gameSpeed')) + 0.25)
    document.getElementById('game-speed').textContent = `Game Speed: ${localStorage.getItem('gameSpeed')}`
    document.getElementById('minus-game-speed').removeAttribute('disabled')
  } else {
    document.getElementById('add-game-speed').setAttribute('disabled', true)
  }
}

function minusStartingWave() {
  if (Number(localStorage.getItem('startingWave')) > 1) {
    localStorage.setItem('startingWave', Number(localStorage.getItem('startingWave')) - 1)
    document.getElementById('starting-wave').textContent = `Starting Wave: ${localStorage.getItem('startingWave')}`
    document.getElementById('add-starting-wave').removeAttribute('disabled')
  } else {
    document.getElementById('minus-starting-wave').setAttribute('disabled', true)
  }

  document.getElementById('starting-cash').textContent = `(starting cash: $${getStartingCash()})`
  game.clear()
  game = new Game(getStartingCash(), Number(localStorage.getItem('startingWave')))
  game.start()
}

function addStartingWave() {
  if (Number(localStorage.getItem('startingWave')) < Number(localStorage.getItem('highestWave')) - 5) {
    localStorage.setItem('startingWave', Number(localStorage.getItem('startingWave')) + 1)
    document.getElementById('starting-wave').textContent = `Starting Wave: ${localStorage.getItem('startingWave')}`
    document.getElementById('minus-starting-wave').removeAttribute('disabled')
  } else {
    document.getElementById('add-starting-wave').setAttribute('disabled', true)
  }

  document.getElementById('starting-cash').textContent = `(starting cash: $${getStartingCash()})`
  game.clear()
  game = new Game(getStartingCash(), Number(localStorage.getItem('startingWave')))
  game.start()
}
