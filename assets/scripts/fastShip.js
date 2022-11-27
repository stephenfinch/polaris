class FastShip extends Ship {
  constructor() {
    super()
    this.circleDiv.addClass('fast-ship')
    this.r = 5
    this.speed = 2.25
    this.health = 0.9
    this.reward = 2
  }
}
