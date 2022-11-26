let game

function setup() {
  createCanvas(windowWidth, windowHeight)

  game = new Game()
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

window.addEventListener('DOMContentLoaded', (event) => {
  const button = document.getElementById('full-screen')
  button.addEventListener('click', () => {
    document.body.requestFullscreen()
  })
})
