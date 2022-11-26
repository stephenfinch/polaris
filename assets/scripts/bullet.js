class Bullet extends Circle {
  constructor(target) {
    super()
    this.circleDiv.addClass('bullet')
    this.pos = createVector(width / 2, height / 2)
    this.r = 2
    this.target = target
    this.damage = 1
    this.active = true
  }

  checkForHit() {
    if (this.collision(this.target.pos.x, this.target.pos.y, this.target.r, this.r)) {
      this.target.takeHit(this.damage)
      this.active = false
    }
  }

  move() {
    const setpoint = this.target.pos.copy()
    const vel = setpoint.sub(this.pos)
    vel.setMag(3)
    this.pos.add(vel)
    this.checkForHit()
  }

  fade() {
    this.circleDiv.remove()
  }

  update() {
    this.active ? this.move() : this.fade()
  }

  show() {
    this.circleDiv.position(this.pos.x, this.pos.y)
  }
}
