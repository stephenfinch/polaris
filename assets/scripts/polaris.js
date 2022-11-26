class Polaris extends Circle {
  constructor() {
    super()
    this.circleDiv.addClass('polaris')
    this.r = 20
    this.damage = 1
    this.reload = 1
    this.bullets = []

    this._readyToShoot = true
  }

  readyToShoot() {
    return this._readyToShoot
  }

  getNextTarget(ships) {
    let nextTarget = ships[0]

    ships.forEach((ship) => {
      if (this.distance(nextTarget.pos.x, nextTarget.pos.y) > this.distance(ship.pos.x, ship.pos.y)) {
        nextTarget = ship
      }
    })

    return nextTarget
  }

  targetInRange(ship) {
    return this.collision(ship.pos.x, ship.pos.y, ship.r, 100)
  }

  shoot(target) {
    const bullet = new Bullet(target)
    this.bullets.push(bullet)
    this._readyToShoot = false
  }

  updateBullets() {
    this.bullets.forEach((bullet) => {
      bullet.update()
      bullet.show()
    })
  }

  update(ships) {
    const nextTarget = this.getNextTarget(ships)

    if (this.readyToShoot() && this.targetInRange(nextTarget)) {
      this.shoot(nextTarget)
    }

    this.updateBullets()
  }

  show() {
    // TODO: draw a better range circle
    clear()
    stroke('rgba(0, 255, 0, 0.25)')
    noFill()
    circle(this.pos.x, this.pos.y, 200)

    this.circleDiv.position(this.pos.x, this.pos.y)
  }
}
