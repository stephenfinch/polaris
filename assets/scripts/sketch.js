let game, banner

function setup() {
  createCanvas(windowWidth, windowHeight)

  if (!localStorage.getItem('highestWave')) {
    localStorage.setItem('highestWave', 1)
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
  loop()

  document.getElementById('banner').classList.add('banner-fade')
}

function openModal() {
  noLoop()
  document.getElementById('settings').classList.remove('hidden')
  document.getElementById('highest-wave').textContent = `Highest Wave: ${localStorage.getItem('highestWave')}`
}

function closeSettings() {
  loop()
  document.getElementById('settings').classList.add('hidden')
}
