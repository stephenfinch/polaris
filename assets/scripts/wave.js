class Wave {
  constructor(number) {
    this.number = number
    this.value = number * 3 + 2
    this.difficulty = number / 30
    this.shipQueue = this.draftShips()
    this.ships = []
    this.activeShips
    this.duration = 20000

    this.spawnRate = this.duration / this.shipQueue.length
    this.lastSpawnTime = Date.now() - this.duration
  }

  draftShips() {
    const queue = []

    for (let i = 1; i < random(this.difficulty, this.value * 0.3); i++) {
      const fastShip = new FastShip(this.difficulty)
      queue.push(fastShip)
      this.value -= fastShip.reward
    }

    for (let i = 1; i < random(this.difficulty, this.value * 0.2); i++) {
      const heavyShip = new HeavyShip(this.difficulty)
      queue.push(heavyShip)
      this.value -= heavyShip.reward
    }

    for (let i = 0; i < this.value; i++) {
      queue.push(new Ship(this.difficulty))
    }
    this._originalQueueLength = queue.length

    return queue.sort(() => Math.random() - 0.5)
  }

  spawnShip() {
    this.ships.push(this.shipQueue.pop())
    this.lastSpawnTime = Date.now()
  }

  updateShips() {
    this.ships = this.ships.filter((ship) => !ship.dead())
    this.activeShips = this.ships.filter((ship) => !ship.doomed())

    this.ships.forEach((ship) => {
      ship.update()
      ship.show()
    })

    if (this.shipQueue.length > 0 && (Date.now() - this.lastSpawnTime) * Number(localStorage.getItem('gameSpeed')) >= this.spawnRate) {
      this.spawnShip()
    }
  }

  updateCash() {
    this.ships.forEach((ship) => {
      if (ship.dead()) game.updateCash(ship.reward)
    })
  }

  checkForWaveOver() {
    if (this.shipQueue.length + this.ships.length === 0) {
      this.isRunning = false
    }
  }

  percentLeft() {
    return ((this._originalQueueLength - (this.shipQueue.length + this.ships.length)) / this._originalQueueLength) * 100
  }

  clear() {
    this.ships.forEach((ship) => ship.clear())
  }

  start() {
    this.isRunning = true
    document.getElementById('wave-line').style.width = '100%'
  }

  update() {
    if (!this.isRunning) return

    this.updateCash()
    this.updateShips()
    this.checkForWaveOver()

    document.getElementById('wave-line').style.width = `calc(100% - ${this.percentLeft()}%)`
  }
}
