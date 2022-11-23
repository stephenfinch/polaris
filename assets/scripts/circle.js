class Circle {
  constructor(id, x, y, r) {
    this._id = id
    this._x = x
    this._y = y
    this._r = r
    this._div = document.createElement('div')
  }

  update() {
    console.log('update')
    const oldTop = this._div.style.top
    const newTop = this.pixelToNumber(oldTop) + 1
    this._div.style.top = this.numberToPixel(newTop)
  }

  show() {
    this._div.setAttribute('id', this._id)
    this._div.classList.add('circle')

    map.appendChild(this._div)
  }

  pixelToNumber(pixels) {
    return Number(pixels.slice(0, -2))
  }

  numberToPixel(number) {
    return `${number}px`
  }
}
