class Circle {
  constructor() {
    this.circleDiv = createDiv()
    this.circleDiv.addClass('circle')
  }
}

class Polaris extends Circle {
  constructor() {
    super()
    this.circleDiv.addClass('polaris')
    this.circleDiv.center()
  }

  show() {
    this.circleDiv
  }
}

class Ship extends Circle {
  constructor() {
    super()
    this.circleDiv.addClass('ship')
    this.circleDiv.addClass('center')
    this.pos = createVector(random(0, width), random(0, height))
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
