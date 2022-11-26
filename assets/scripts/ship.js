class Ship extends Circle {
  constructor() {
    super()
    this.active = true
    this.circleDiv.addClass('ship')
    this.pos = createVector(random(0, width), random(0, height))
    this.r = 7
    this.health = 1
    this.fadeValue = 1
  }

  takeHit(damage) {
    this.health -= damage
    if (this.health <= 0) this.active = false
  }

  move() {
    const center = createVector(width / 2, height / 2)
    const vel = center.sub(this.pos)
    vel.setMag(1)
    this.pos.add(vel)
  }

  fade() {
    if (this.dead()) return

    this.fadeValue -= 0.1
    this.circleDiv.style('background', `rgba(215, 65, 167, ${this.fadeValue / 4})`)
    this.circleDiv.style('border', `2px solid rgba(215, 65, 167, ${this.fadeValue})`)
    this.circleDiv.style('box-shadow', `0px 0px 25px 10px rgba(215, 65, 167, ${this.fadeValue / 4})`)
    this.circleDiv.style('width', `${34 - this.fadeValue * 20}px`)
    this.circleDiv.style('height', `${34 - this.fadeValue * 20}px`)
  }

  dead() {
    return this.fadeValue < 0
  }

  update() {
    this.active ? this.move() : this.fade()

    if (this.dead()) this.circleDiv.remove()
  }

  show() {
    this.circleDiv.position(this.pos.x, this.pos.y)
    this.circleDiv
  }
}
