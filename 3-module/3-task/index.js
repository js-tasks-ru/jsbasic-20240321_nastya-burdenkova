function camelize(str) {
  
  return str
    .split("-")
    .map((el, index) => {
      if (index === 0) {
        return el;
      } else {
        return el[0].toUpperCase() + el.slice(1);
      }
    })
    .join("");
}
