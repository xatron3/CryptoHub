function getPercentageIncrease(numA, numB) {
  numA = parseFloat(numA);
  numB = parseFloat(numB);

  return ((numA - numB) / numB) * 100;
}

export default {
  getPercentageIncrease,
};
