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
  }

  update(ships) {
    if (!this.readyToShoot()) return

    const nextTarget = this.getNextTarget(ships)
    if (!this.targetInRange(nextTarget)) return

    // this.shoot(nextTarget)
    console.log('shoot')
  }

  readyToShoot() {
    return true
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

  shoot() {
    this.bullets.push(new Bullet())
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
  constructor() {
    super()
    this.circleDiv.addClass('bullet')
    this.pos = createVector(width / 2, height / 2)
    this.r = 2
  }

  update(targetVector) {
    const setpoint = targetVector
    const vel = setpoint.sub(this.pos)
    vel.setMag(3)
    this.pos.add(vel)
  }

  show() {
    this.circleDiv.position(this.pos.x, this.pos.y)
  }
}

class Ship extends Circle {
  constructor() {
    super()
    this.circleDiv.addClass('ship')
    this.pos = createVector(random(0, width), random(0, height))
    this.r = 7
  }

  update() {
    const center = createVector(width / 2, height / 2)
    const vel = center.sub(this.pos)
    vel.setMag(1)
    this.pos.add(vel)
  }

  show() {
    this.circleDiv.position(this.pos.x, this.pos.y)
    this.circleDiv
  }
}
