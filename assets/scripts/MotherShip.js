class MotherShip extends Ship {
  constructor(difficulty) {
    super()
    this.circleDiv.addClass('mother-ship')
    this.r = 30
    this.pos = this.startingVector()
    this.speed = 0.15
    this.health = 5 + difficulty
    this.reward = 10
    this.shipType = 'mother-ship'
    this.fadeAnimationLength = 5000
  }

  startingVector() {
    const startingOptions = [createVector(width + 30, random(-30, 30) + height / 2), createVector(-30, random(-30, 30) + height / 2)]

    return startingOptions[Math.floor(Math.random() * startingOptions.length)]
  }
}
