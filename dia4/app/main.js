import './style.css'

const CARS_URL = 'http://localhost:3333/cars'

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

function showErrorMessage(message) {
  const carRequestErrorMessage = document.querySelector(
    '[data-js="car-request-error-message"]'
  )
  carRequestErrorMessage.classList.remove('hide')
  carRequestErrorMessage.textContent = `❗ ${message}`
}

function hideErrorMessage() {
  const carRequestErrorMessage = document.querySelector(
    '[data-js="car-request-error-message"]'
  )
  carRequestErrorMessage.classList.add('hide')
}

async function deleteCar(carRow, carPlate) {
  const response = await fetch(CARS_URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ plate: carPlate }),
  })

  if (!response.ok) {
    return
  }

  carRow.remove()

  const carsRows = document.querySelectorAll('[data-car-row]')

  if (carsRows.length === 0) {
    showNotFoundCarsMessage()
  }
}

function insertNewEntry({ imageUrl, model, year, plate, color }) {
  const carsTable = document.querySelector('[data-js="cars-table"]')

  const newRow = carsTable.insertRow(-1)
  newRow.dataset.carRow = ''

  const imageCell = newRow.insertCell(0)
  const modelCell = newRow.insertCell(1)
  const yearCell = newRow.insertCell(2)
  const plateCell = newRow.insertCell(3)
  const colorCell = newRow.insertCell(4)
  const actionsCell = newRow.insertCell(5)

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

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.textContent = 'Excluir'
  deleteButton.addEventListener('click', () => deleteCar(newRow, plate))

  actionsCell.appendChild(deleteButton)
}

async function fetchCars() {
  const response = await fetch(CARS_URL)

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

async function createNewCar({ imageUrl, model, year, plate, color }) {
  const response = await fetch(CARS_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      image: imageUrl,
      brandModel: model,
      year,
      plate,
      color,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    showErrorMessage(errorData.message)
    throw new Error('Invalid request')
  }

  hideErrorMessage()
  hideNotFoundCarsMessage()
  insertNewEntry({ imageUrl, model, year, plate, color })
}

const carForm = document.querySelector('[data-js="car-form"]')

carForm.addEventListener('submit', async e => {
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

  await createNewCar(payload)

  carForm.image.value = ''
  carForm.model.value = ''
  carForm.year.value = ''
  carForm.plate.value = ''
  carForm.color.value = '#000000'

  carForm.image.focus()
})

fetchCars()
