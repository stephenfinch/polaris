class Ship extends Circle {
  constructor(difficulty) {
    super()
    this._dead = false
    this.circleDiv.addClass('ship')
    this.pos = this.startingVector()
    this.r = 7
    this.speed = 1
    this.health = 0.9 + difficulty
    this.incomingDamage = 0
    this.reward = 1
    this.fadeAnimationLength = 1000
    this.shipType = 'ship'
  }

  startingVector() {
    const startingOptions = [
      createVector(width + random(10, 100), random(height)),
      createVector(random(-10, -100), random(height)),
      createVector(random(width), height + random(10, 100)),
      createVector(random(width), random(-10, -100)),
    ]

    return startingOptions[Math.floor(Math.random() * startingOptions.length)]
  }

  takeHit(damage) {
    this.health -= damage
    this.incomingDamage -= damage
    if (this.health <= 0) {
      this._dead = true
      this.fade()
    }
  }

  expectHit(damage) {
    this.incomingDamage += damage
  }

  move() {
    const center = createVector(width / 2, height / 2)
    const vel = center.sub(this.pos)
    vel.setMag(this.speed)
    this.pos.add(vel)
  }

  fade() {
    this.moneyDiv = createDiv(`$${this.reward}`)
    this.moneyDiv.addClass('money')
    this.moneyDiv.addClass('center')
    this.moneyDiv.position(this.pos.x, this.pos.y)
    this.moneyDiv.addClass('fade')
    this.circleDiv.addClass(`fade-${this.shipType}`)

    window.setTimeout(() => {
      this.clear()
    }, this.fadeAnimationLength)
  }

  doomed() {
    return this.health - this.incomingDamage <= 0
  }

  dead() {
    return this._dead
  }

  clear() {
    this.circleDiv.remove()
    this.moneyDiv?.remove()
  }

  update() {
    this.move()
  }
}
