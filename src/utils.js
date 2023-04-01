const symbols = '_-¿!@#$%^&*()'.split('')
const numbers = '0123456789'.split('')
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

let passwordCharacters

export const newPassword = ({ number, hasSymbols, hasNumbers, hasLowercase, hasUppercase }) => {
  const emptyArray = [...Array(number)]
  passwordCharacters = [
    ...(hasSymbols ? symbols : []),
    ...(hasNumbers ? numbers : []),
    ...(hasLowercase ? lowercaseLetters : []),
    ...(hasUppercase ? uppercaseLetters : [])
  ]

  return emptyArray
    .map(() => {
      const randomIndex = Math.floor(Math.random() * passwordCharacters.length)
      return passwordCharacters[randomIndex]
    })
    .join('')
}

export const animate = (originalString, destination) => {
  destination.value = ''
  originalString.split('').forEach((character, index) => {
    // set the string at the end of the loop
    const characterRevealTimeout = window.setTimeout(() => {
      if (index === originalString.length - 1) {
        destination.value = originalString
        return
      }
      destination.value += character

      // suffle variable in the loop represent the probability
      // the character might have to shuffle.
      // The higher the number, higher the suffle.

      for (let shuffle = 15; shuffle > 0; shuffle--) {
        destination.value = destination.value.replace(
          destination.value.charAt(destination.value.length - 1),
          passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)]
        )
      }
      const currentChars = [...destination.value.split('')]
      currentChars[index] = character
      destination.value = currentChars.join('')
      window.clearTimeout(characterRevealTimeout)
      // speed per character appearing
    }, index * 100)
  })
}
