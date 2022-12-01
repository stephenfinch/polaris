class Game {
  constructor(startingCash = 0, startingWave = 1) {
    this.polaris = new Polaris()
    this.shop = new Shop(this)
    this.wave = new Wave(startingWave)
    this.isOver = false
    this.cash = Number(startingCash) * 10
    updateUI(this)
  }

  updateCash(newCash) {
    if (newCash) this.cash += newCash
  }

  updateWave() {
    if (!this.wave.isRunning) {
      this.wave = new Wave(this.wave.number + 1)
      localStorage.setItem('highestWave', Math.max(localStorage.getItem('highestWave'), this.wave.number))
      this.wave.start()
    }

    this.wave.update()
  }

  checkForGameOver() {
    this.wave.ships.forEach((ship) => {
      if (this.polaris.collision(ship.pos.x, ship.pos.y, ship.r, this.polaris.r)) {
        this.isOver = true
        noLoop()
        playSound(gameOverAudio)
      }
    })
  }

  clear() {
    this.wave.clear()
    this.polaris.clear()
  }

  start() {
    this.isRunning = true
    this.wave.start()
  }

  update() {
    if (!this.isRunning) return

    this.updateWave()
    this.checkForGameOver()
    this.polaris.update(this.wave.activeShips)
    updateUI(this)
  }

  show() {
    this.polaris.show()
  }
}
