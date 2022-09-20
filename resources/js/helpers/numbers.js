/**
 * Get precentage increase
 * @param {float} numA
 * @param {float} numB
 * @returns {float}
 */
const getPercentageIncrease = (numA, numB) => {
  numA = numA.split(",").join("");
  numB = numB.split(",").join("");

  return ((numA - numB) / numB) * 100;
};

/**
 * Format price
 * @param {float} number
 * @param {int} decimals Number of decimal numbers (ex 0.004444)
 * @returns {float}
 */
const formatPrice = (number, decimals = 4) => {
  number = number.toString().split(",").join("");
  number = parseFloat(number);
  let formattedNumber;

  var m = -Math.floor(Math.log10(number) + 1);

  if (number.toFixed() < 0.01) {
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
