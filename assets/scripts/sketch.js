let game, banner
const menuAudio = new Audio(`assets/audio/menu${Math.round(Math.random(3)) + 1}.mp3`)
const soundtrack = new Audio('assets/audio/soundtrack.mp3')
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

  game = new Game(localStorage.getItem('highestWave'))
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
    game = new Game(localStorage.getItem('highestWave'))
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
  document.getElementById('starting-cash').textContent = `(starting cash: $${Number(localStorage.getItem('highestWave')) * 5})`
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
