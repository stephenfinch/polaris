class Game {
  constructor() {
    this.polaris = new Polaris()
    this.shop = new Shop(this)
    this.wave = new Wave()
    this.ships = []
    this.activeShips
    this.isOver = false
    this.cash = 0
    updateUI(this)

    this.spawnRate = 4
    window.setInterval(() => {
      this.spawnRate += 1
    }, 100000)
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

    if (this.ships.length < this.spawnRate) {
      this.ships.push(new Ship())
      if (random() < 0.1 + this.spawnRate / 20) {
        this.ships.push(new FastShip())
      }
      if (random() < 0.05 + this.spawnRate / 20) {
        this.ships.push(new HeavyShip())
      }
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
