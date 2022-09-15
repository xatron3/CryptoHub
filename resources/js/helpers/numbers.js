function getPercentageIncrease(numA, numB) {
  numA = numA.split(",").join("");
  numB = numB.split(",").join("");

  return ((numA - numB) / numB) * 100;
}

export default {
  getPercentageIncrease,
};
