/**
 * Get precentage increase
 * @param {float} numA
 * @param {float} numB
 * @returns {float}
 */
const getPercentageIncrease = (numA, numB) => {
  return ((numA - numB) / numB) * 100;
};

/**
 * Format price
 * @param {float} number
 * @param {int} decimals Number of decimal numbers (ex 0.004444)
 * @returns {float}
 */
const formatPrice = (number, decimals = 4) => {
  if (!number) return 0;

  number = number.toString().split(",").join("");
  number = parseFloat(number);
  let formattedNumber, m;

  if (number > 0) m = -Math.floor(Math.log10(number) + 1);
  else m = 0;

  if (number < 0.99) {
    formattedNumber = number.toFixed(m + decimals);
  } else {
    formattedNumber = number.toFixed(2);
  }

  return formattedNumber;
};
export default {
  getPercentageIncrease,
  formatPrice,
};
