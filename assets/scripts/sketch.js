let polaris
let ships = []

function setup() {
  createCanvas(windowWidth, windowHeight)

  polaris = new Polaris()
  ships.push(new Ship(), new Ship(), new Ship())
}

function draw() {
  polaris.show()

  ships.forEach((ship) => {
    ship.update()
    ship.show()
  })
}
