class Polaris extends Circle {
  constructor() {
    super()
  }

  update() {
    // console.log('update')
    // const oldTop = this._div.style.top
    // const newTop = Number(oldTop.slice(0, -2)) + 1
    // this._div.style.top = `${newTop}px`
  }

  show() {
    this._div.setAttribute('id', this._id)
    this._div.classList.add('circle')
    this._div.classList.add('polaris')
    this._div.classList.add('center')
    this._div.style.width = '40px'
    this._div.style.height = '40px'

    map.appendChild(this._div)
  }
}
