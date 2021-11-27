
/**
 * Returns random number between two extreme values.
 * Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * @param minRandomNumber {number} minimum possible value
 * @param maxRandomNumber {number} maximum possible value
 * @returns {number}
 */
let randomNumberBetween = (minRandomNumber, maxRandomNumber) => {
  return Math.floor(Math.random() * (maxRandomNumber - minRandomNumber + 1) + minRandomNumber);
}

/**
 * Creates a random color in rgba format.
 * Minimum alpha is 0.3 (30%)
 * Example: rgba(123, 123, 123, 0.5)
 * @returns {string}
 */
let getRandomColor = () => {

  let randomRed = randomNumberBetween(0, 255);
  let randomGreen = randomNumberBetween(0, 255);
  let randomBlue = randomNumberBetween(0, 255);
  let randomAlpha = (Math.random() + 0.3).toFixed(2);

  return `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${randomAlpha})`;
}