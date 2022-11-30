class FastShip extends Ship {
  constructor(difficulty) {
    super()
    this.circleDiv.addClass('fast-ship')
    this.r = 5
    this.speed = 2.25
    this.health = 0.5 + difficulty
    this.reward = 2
    this.shipType = 'fast-ship'
    this.fadeAnimationLength = 750
  }
}
