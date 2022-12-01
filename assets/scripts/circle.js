class Circle {
  constructor() {
    this.circleDiv = createDiv()
    this.circleDiv.addClass('circle')
    this.circleDiv.addClass('center')
    this.pos = createVector(width / 2, height / 2)
  }

  collision(x, y, r1, r2) {
    return 0 > this.distance(x, y, r1, r2)
  }

  distance(x, y, r1, r2) {
    const h = r1 + r2
    const a = this.pos.x - x
    const b = this.pos.y - y

    return Math.sqrt(a * a + b * b) - h
  }

  clear() {
    this.circleDiv.remove()
  }

  show() {
    if (this.pos.x < width - this.r && this.pos.x > 0 + this.r && this.pos.y < height - this.r && this.pos.y > 0 + this.r) {
      this.circleDiv.position(this.pos.x, this.pos.y)
    }
  }
}
