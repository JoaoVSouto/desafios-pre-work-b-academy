function capitalize(string) {
  if (!string) {
    return ''
  }

  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`
}

function capitalizeName(name) {
  const BLACKLIST = ['de', 'da', 'do', 'dos']

  const words = name.split(' ')
  const capitalizedWords = words.map((word) =>
    BLACKLIST.includes(word.toLowerCase()) ? word.toLowerCase() : capitalize(word)
  )

  return capitalizedWords.join(' ')
}

const nameInput = document.querySelector('[data-js="name"]')

nameInput.addEventListener('input', e => {
  e.target.value = capitalizeName(e.target.value)
})
