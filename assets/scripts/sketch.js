let game

function setup() {
  createCanvas(windowWidth, windowHeight)

  game = new Game()
}

function draw() {
  game.update()
  game.show()
}
