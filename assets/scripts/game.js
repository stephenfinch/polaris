class Game {
  constructor() {
    this.polaris = new Polaris()
    this.ships = []
    this.activeShips
  }

  updateShips() {
    this.ships = this.ships.filter((ship) => !ship.dead())
    this.activeShips = this.ships.filter((ship) => !ship.doomed())

    if (this.ships.length < 5) {
      this.ships.push(new Ship())
    }

    this.ships.forEach((ship) => {
      ship.update()
      ship.show()
      if (this.polaris.collision(ship.pos.x, ship.pos.y, ship.r, this.polaris.r)) {
        console.log('game over')
        noLoop()
      }
    })
  }

  update() {
    this.updateShips()
    this.polaris.update(this.activeShips)
  }

  show() {
    this.polaris.show()
  }
}
