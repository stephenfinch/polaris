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
}
