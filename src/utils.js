const SYMBOLS = '_-¿!@#$%^&*()?¡'.split('')
const NUMBERS = '0123456789'.split('')
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

let passwordCharacters

/**
 * Function to generate a new password based on the options provided
 * @param {object} options
 * @returns {string} Password output
 */
export const newPassword = ({ length, hasSymbols, hasNumbers, hasLowercase, hasUppercase }) => {
  const emptyArray = [...Array(length)]
  passwordCharacters = [
    ...(hasSymbols ? SYMBOLS : []),
    ...(hasNumbers ? NUMBERS : []),
    ...(hasLowercase ? LOWERCASE_LETTERS : []),
    ...(hasUppercase ? UPPERCASE_LETTERS : [])
  ]

  return emptyArray
    .map(() => {
      const randomIndex = Math.floor(Math.random() * passwordCharacters.length)
      return passwordCharacters[randomIndex]
    })
    .join('')
}

/**
 * Function to animate a reference string with random characters
 * @param {string} originalString
 * @param {ref} destination
 * @returns {undefined}
 */
export const animate = (originalString, destination) => {
  destination.value = ''

  // Repeat the same for every character in the string
  originalString.split('').forEach((character, index) => {
    // set the string at the end of the loop
    const characterRevealTimeout = window.setTimeout(() => {
      // End the function and set the destionation value
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
          // Replace character with a random one
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
