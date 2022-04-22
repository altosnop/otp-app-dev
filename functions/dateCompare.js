const dateCompare = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (date1 < date2) {
    return false;
  } else {
    return true;
  }
};

module.exports = dateCompare;
