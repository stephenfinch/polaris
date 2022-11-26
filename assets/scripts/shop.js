class Shop {
  constructor() {
    this.reloadPrice = 1
    this.reloadPriceIncrement = 2
  }

  increaseReloadPrice() {
    this.reloadPrice *= this.reloadPriceIncrement
  }
}
