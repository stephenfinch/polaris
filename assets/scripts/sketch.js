let polaris
let ships = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  polaris = new Polaris()

  ships.push(new Ship())
  ships.push(new Ship())
  ships.push(new Ship())
}

function draw() {
  polaris.update(ships)
  polaris.show()

  ships.forEach((ship) => {
    ship.update()
    ship.show()
    if (polaris.collision(ship.pos.x, ship.pos.y, ship.r, polaris.r)) {
      console.log('game over')
      noLoop()
    }
  })
}
