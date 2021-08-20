import './style.css'

function insertNewEntry({ imageUrl, model, year, plate, color }) {
  const carsTable = document.querySelector('[data-js="cars-table"]')

  const newRow = carsTable.insertRow(-1)

  const imageCell = newRow.insertCell(0)
  const modelCell = newRow.insertCell(1)
  const yearCell = newRow.insertCell(2)
  const plateCell = newRow.insertCell(3)
  const colorCell = newRow.insertCell(4)

  const imgElement = document.createElement('img')
  imgElement.src = imageUrl
  imgElement.alt = model
  imageCell.appendChild(imgElement)

  modelCell.textContent = model
  yearCell.textContent = year
  plateCell.textContent = plate

  const colorBlock = document.createElement('div')
  colorBlock.classList.add('car-color')
  colorBlock.style.backgroundColor = color
  colorCell.appendChild(colorBlock)
}

const carForm = document.querySelector('[data-js="car-form"]')

carForm.addEventListener('submit', e => {
  e.preventDefault()

  const imageUrl = carForm.image.value
  const model = carForm.model.value
  const year = carForm.year.value
  const plate = carForm.plate.value
  const color = carForm.color.value

  const payload = {
    imageUrl,
    model,
    year,
    plate,
    color,
  }

  insertNewEntry(payload)

  carForm.image.value = ''
  carForm.model.value = ''
  carForm.year.value = ''
  carForm.plate.value = ''
  carForm.color.value = '#000000'

  carForm.image.focus()
})

