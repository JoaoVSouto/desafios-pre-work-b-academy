import './style.css'

function showNotFoundCarsMessage() {
  const notFoundMessage = document.querySelector(
    '[data-js="cards-not-found-msg"]'
  )
  notFoundMessage.classList.remove('hide')
}

function hideNotFoundCarsMessage() {
  const notFoundMessage = document.querySelector(
    '[data-js="cards-not-found-msg"]'
  )
  notFoundMessage.classList.add('hide')
}

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

async function fetchCars() {
  const response = await fetch('http://localhost:3333/cars')

  if (!response.ok) {
    return
  }

  const carsData = await response.json()

  if (carsData.length === 0) {
    showNotFoundCarsMessage()
  } else {
    hideNotFoundCarsMessage()
    carsData.forEach(car => insertNewEntry({
      imageUrl: car.image,
      model: car.brandModel,
      year: car.year,
      plate: car.plate,
      color: car.color,
    }))
  }
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

fetchCars()
