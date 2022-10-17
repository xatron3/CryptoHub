/**
 * Get Pagination Page
 * @param {float} numA
 * @param {float} numB
 * @returns {float}
 */
const getPaginationPage = (label) => {
  var page;

  if (label === "&laquo; Previous") {
    page = "prev";
  } else if (label === "Next &raquo;") {
    page = "next";
  } else {
    page = parseInt(label);
  }

  return page;
};

const setPaginationPage = (currentPage, newPage) => {
  if (newPage === "prev") {
    return Math.max(1, currentPage - 1);
  }

  if (newPage === "next") {
    return Math.max(1, currentPage + 1);
  }

  return newPage;
};

export default { getPaginationPage, setPaginationPage };
