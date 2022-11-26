function updateUI(game) {
  document.getElementById('reload-button').innerHTML = `
      <span>Reload</span>
      <div class="flex col">
        <span class="soft-text">${game.polaris.reload.toFixed(1)}</span>
        <span class="soft-text">($${game.shop.reloadPrice.toFixed(0)})</span>
      </div>
    `

  document.getElementById('damage-button').innerHTML = `
    <span>Damage</span>
    <div class="flex col">
      <span class="soft-text">${game.polaris.damage.toFixed(1)}</span>
      <span class="soft-text">($${game.shop.damagePrice.toFixed(0)})</span>
    </div>
  `

  document.getElementById('cash').textContent = `Cash: $${game.cash}`

  if (game.isOver) {
    const banner = document.getElementById('banner')
    banner.classList.remove('banner-fade')
    banner.innerHTML = `
      <h2 class="banner-title">Game Over</h2>
      <span class="soft-text">Wave: ${game.wave}</span>
      <span class="soft-text pulse">(click to play again)</span>
    `
  }
}
