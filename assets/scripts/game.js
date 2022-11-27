class Game {
  constructor() {
    this.polaris = new Polaris()
    this.shop = new Shop(this)
    this.wave = new Wave()
    this.ships = []
    this.activeShips
    this.isOver = false
    this.wave = 1
    this.cash = 0
    updateUI(this)
  }

  updateCash() {
    this.ships.forEach((ship) => {
      if (ship.dead) this.cash += ship.reward
    })

    document.getElementById('cash').textContent = `Cash: ${this.cash}`
  }

  updateShips() {
    this.ships = this.ships.filter((ship) => !ship.dead)
    this.activeShips = this.ships.filter((ship) => !ship.doomed())

    if (this.ships.length < 5) {
      this.ships.push(new Ship())
    }

    this.ships.forEach((ship) => {
      ship.update()
      ship.show()
    })
  }

  checkForGameOver() {
    this.ships.forEach((ship) => {
      if (this.polaris.collision(ship.pos.x, ship.pos.y, ship.r, this.polaris.r)) {
        this.isOver = true
        noLoop()
      }
    })
  }

  clear() {
    this.ships.forEach((ship) => ship.clear())
    this.polaris.clear()
  }

  update() {
    this.updateCash()
    this.updateShips()
    this.checkForGameOver()
    this.polaris.update(this.activeShips)
    updateUI(this)
  }

  show() {
    this.polaris.show()
  }
}
