class Bullet extends Circle {
  constructor(target, damage) {
    super()
    this.circleDiv.addClass('bullet')
    this.pos = createVector(width / 2, height / 2)
    this.r = 2
    this.target = target
    this.damage = damage
    this.active = true
    this.fadeAnimationLength = 100
  }

  checkForHit() {
    if (this.collision(this.target.pos.x, this.target.pos.y, this.target.r, this.r)) {
      this.target.takeHit(this.damage)
      this.active = false
      this.fade()
    }
  }

  fade() {
    this.circleDiv.addClass('fade-bullet')

    window.setTimeout(() => {
      this.clear()
    }, this.fadeAnimationLength)
  }

  move() {
    const setpoint = this.target.pos.copy()
    const vel = setpoint.sub(this.pos)
    vel.setMag(3 * Number(localStorage.getItem('gameSpeed')))
    this.pos.add(vel)
  }

  update() {
    this.move()
    this.checkForHit()
  }
}
