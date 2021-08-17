import './style.css'

const appElement = document.querySelector('[data-js="app"]')
appElement.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

const appVisibilityToggler = document.querySelector('[data-js="app-visibility-toggler"]')

appVisibilityToggler.addEventListener('click', e => {
  e.preventDefault()

  const isAppElementHidden = appElement.classList.contains('hide')

  if (isAppElementHidden) {
    appElement.classList.remove('hide')
  } else {
    appElement.classList.add('hide')
  }
})
