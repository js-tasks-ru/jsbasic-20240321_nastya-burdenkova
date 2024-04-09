function getMinMax(str) {
  let nums = str
    .split(" ")
    .filter((item) => !isNaN(parseFloat(item)))
    .map((item) => parseFloat(item));

  let min = Math.min(...nums);
  let max = Math.max(...nums);

  return { min, max };
}
