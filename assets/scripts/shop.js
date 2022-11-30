class Shop {
  constructor(game) {
    this.game = game
    this.polaris = game.polaris
    this.reloadPrice = 1
    this.reloadPriceIncrement = 2
    this.damagePrice = 1
    this.damagePriceIncrement = 2
  }

  canBuyReload() {
    return this.game.cash >= this.reloadPrice
  }

  buyReload() {
    if (this.canBuyReload()) {
      this.polaris.reload += 0.1
      this.game.cash -= this.reloadPrice
      this.reloadPrice = Math.round(this.reloadPrice * this.reloadPriceIncrement)
      this.reloadPriceIncrement = Math.max(1.1, this.reloadPriceIncrement * 0.9)
    }
  }

  canBuyDamage() {
    return this.game.cash >= this.damagePrice
  }

  buyDamage() {
    if (this.canBuyDamage()) {
      this.polaris.damage += 0.1
      this.game.cash -= this.damagePrice
      this.damagePrice = Math.round(this.damagePrice * this.damagePriceIncrement)
      this.damagePriceIncrement = Math.max(1.1, this.damagePriceIncrement * 0.9)
    }
  }
}
