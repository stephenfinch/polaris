class HeavyShip extends Ship {
  constructor() {
    super()
    this.circleDiv.addClass('heavy-ship')
    this.r = 21
    this.speed = 0.5
    this.health = 2.5
    this.reward = 4
    this.shipType = 'heavy-ship'
    this.fadeAnimationLength = 2000
  }
}
