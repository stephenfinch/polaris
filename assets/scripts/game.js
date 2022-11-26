class Game {
  constructor() {
    this.polaris = new Polaris()
    this.ships = []
    this.activeShips
    this.cash = 0
  }

  updateCash() {
    this.ships.forEach((ship) => {
      if (ship.dead()) this.cash += ship.reward
    })

    document.getElementById('cash').textContent = `Cash: ${this.cash}`
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
    this.updateCash()
    this.updateShips()
    this.polaris.update(this.activeShips)
  }

  show() {
    this.polaris.show()
  }
}
