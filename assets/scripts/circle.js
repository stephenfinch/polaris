class Circle {
  constructor() {
    this.circleDiv = createDiv()
    this.circleDiv.addClass('circle')
    this.circleDiv.addClass('center')
    this.pos = createVector(width / 2, height / 2)
  }

  collision(x, y, r1, r2) {
    const h = r1 + r2

    return h > this.distance(x, y)
  }

  distance(x, y) {
    let a, b

    a = this.pos.x - x
    b = this.pos.y - y

    return Math.sqrt(a * a + b * b)
  }
}

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
