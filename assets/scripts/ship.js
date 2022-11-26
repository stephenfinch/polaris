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
      createVector(width + 10, random(height)),
      createVector(-10, random(height)),
      createVector(random(width), height + 10),
      createVector(random(width), -10),
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
    this.circleDiv.style('width', `${34 - this.fadeValue * 20}px`)
    this.circleDiv.style('height', `${34 - this.fadeValue * 20}px`)
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
