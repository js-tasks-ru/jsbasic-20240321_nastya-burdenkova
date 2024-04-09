function makeDiagonalRed(table) {

  const rows = table.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");

    const diagonalCell = cells[i];

    if (diagonalCell) {
      diagonalCell.style.backgroundColor = "red";
    }
  }
}
