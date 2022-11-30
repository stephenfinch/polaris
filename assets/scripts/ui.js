function updateUI(game) {
  const reloadButton = document.getElementById('reload-button')
  game.shop.canBuyReload() ? reloadButton.classList.remove('btn-disabled') : reloadButton.classList.add('btn-disabled')
  reloadButton.innerHTML = `
      <span>Reload</span>
      <div class="flex col">
        <span class="small-text">${game.polaris.reload.toFixed(1)}</span>
        <span class="small-text">$${game.shop.reloadPrice.toFixed(0)}</span>
      </div>
    `

  const damageButton = document.getElementById('damage-button')
  game.shop.canBuyDamage() ? damageButton.classList.remove('btn-disabled') : damageButton.classList.add('btn-disabled')
  damageButton.innerHTML = `
    <span>Damage</span>
    <div class="flex col">
      <span class="small-text">${game.polaris.damage.toFixed(1)}</span>
      <span class="small-text">$${game.shop.damagePrice.toFixed(0)}</span>
    </div>
  `

  document.getElementById('cash').textContent = `Cash: $${game.cash}`
  document.getElementById('wave').textContent = `Wave: ${game.wave.number}`

  if (game.isOver) {
    const banner = document.getElementById('banner')
    banner.classList.remove('banner-fade')
    banner.innerHTML = `
      <h2 class="banner-title">Game Over</h2>
      <span class="soft-text">Wave: ${game.wave.number}</span>
      <span class="soft-text pulse">(click to play again)</span>
    `
  }
}

// TODO: store the elements
