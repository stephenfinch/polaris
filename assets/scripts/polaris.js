class Polaris extends Circle {
  constructor() {
    super()
    this.circleDiv.addClass('polaris')
    this.r = 20
    this.damage = 1
    this.reload = 1
    this.lastShot = Date.now()
    this.bullets = []
    this.range = 150

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
    if (!ship) return

    return this.collision(ship.pos.x, ship.pos.y, ship.r, this.range)
  }

  shoot(target) {
    const bullet = new Bullet(target, this.damage)
    target.expectHit(bullet.damage)
    this.bullets.push(bullet)
    this._readyToShoot = false
    this.lastShot = Date.now()
  }

  updateBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.active)
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

    if (Date.now() - this.lastShot > 1000 / this.reload) {
      this._readyToShoot = true
    }

    this.updateBullets()
  }

  show() {
    // TODO: draw a better range circle
    clear()
    stroke('rgba(111, 255, 229, 0.25)')
    noFill()
    circle(this.pos.x, this.pos.y, this.range * 2)

    this.circleDiv.position(this.pos.x, this.pos.y)
  }
}
