let game, banner

function setup() {
  createCanvas(windowWidth, windowHeight)

  game = new Game()
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
    game = new Game()
  }

  game.start()
  loop()

  document.getElementById('banner').classList.add('banner-fade')
}

function openModal() {
  noLoop()
  document.getElementById('settings').classList.remove('hidden')
}

function closeSettings() {
  loop()
  document.getElementById('settings').classList.add('hidden')
}
