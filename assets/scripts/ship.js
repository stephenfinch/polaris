class Ship extends Circle {
  constructor() {
    super()
    this.active = true
    this.circleDiv.addClass('ship')
    this.pos = this.startingVector()
    this.r = 7
    this.health = 1
    this.incomingDamage = 0
    this.fadeValue = 1
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
    if (this.health <= 0) this.active = false
  }

  expectHit(damage) {
    this.incomingDamage += damage
  }

  move() {
    const center = createVector(width / 2, height / 2)
    const vel = center.sub(this.pos)
    vel.setMag(1)
    this.pos.add(vel)
  }

  fade() {
    if (this.fadeValue < 0) return

    this.fadeValue -= 0.1
    this.circleDiv.style('background', `rgba(215, 65, 167, ${this.fadeValue / 4})`)
    this.circleDiv.style('border', `2px solid rgba(215, 65, 167, ${this.fadeValue})`)
    this.circleDiv.style('box-shadow', `0px 0px 25px 10px rgba(215, 65, 167, ${this.fadeValue / 4})`)
    this.circleDiv.style('width', `${this.r * 2 + 30 - this.fadeValue * 30}px`)
    this.circleDiv.style('height', `${this.r * 2 + 30 - this.fadeValue * 30}px`)
  }

  doomed() {
    return this.health - this.incomingDamage <= 0
  }

  dead() {
    return this.fadeValue <= 0
  }

  update() {
    this.active ? this.move() : this.fade()

    if (this.dead()) this.circleDiv.remove()
  }

  show() {
    if (this.pos.x < width - this.r && this.pos.x > 0 + this.r && this.pos.y < height - this.r && this.pos.y > 0 + this.r) {
      this.circleDiv.position(this.pos.x, this.pos.y)
    }
  }
}
