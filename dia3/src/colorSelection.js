const COLORS_MAP = {
  preto: '#000',
  vermelho: '#f00',
  verde: '#0f0',
  azul: '#00f',
  amarelo: '#ff0',
}

function insertColorsOnShowcase(colors) {
  const colorsShowcaseContainer = document.querySelector(
    '[data-js="colors-showcase-container"]'
  )

  const colorBlocks = [
    ...colorsShowcaseContainer.querySelectorAll('[data-color]')
  ]
  const removedColorBlocks = colorBlocks.filter(
    colorBlock => !colors.includes(colorBlock.dataset.color)
  )
  removedColorBlocks.forEach(colorBlock => colorBlock.remove())

  const colorBlocksColors = colorBlocks.map(
    colorBlock => colorBlock.dataset.color
  )

  const newColors = colors.filter(color => !colorBlocksColors.includes(color))

  newColors.forEach(color => {
    const colorBlock = document.createElement('div')
    colorBlock.dataset.color = color
    colorBlock.style.backgroundColor = COLORS_MAP[color]
    colorsShowcaseContainer.appendChild(colorBlock)
  })
}

function setupColorSelect() {
  const colorPlaygroundContainer = document.querySelector(
    '[data-js="color-playground-container"]'
  )

  const colorSelect = document.createElement('select')
  colorSelect.add(new Option('Preto', 'preto'))
  colorSelect.add(new Option('Vermelho', 'vermelho'))
  colorSelect.add(new Option('Verde', 'verde'))
  colorSelect.add(new Option('Azul', 'azul'))
  colorSelect.add(new Option('Amarelo', 'amarelo'))
  colorSelect.multiple = true

  colorPlaygroundContainer.insertAdjacentElement('afterbegin', colorSelect)

  colorSelect.addEventListener('change', e => {
    const selectedColors = [...e.target.selectedOptions].map(option => option.value)

    insertColorsOnShowcase(selectedColors)
  })
}

setupColorSelect()
