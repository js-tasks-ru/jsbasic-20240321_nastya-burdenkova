function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const status = row.querySelector('td[data-available]');
    const gender = row.querySelector('td:nth-child(3)');
    const age = row.querySelector('td:nth-child(2)');

    if (status) {
      if (status.dataset.available === "true") {
        row.classList.add('available');
      } else if (status.dataset.available === "false") {
        row.classList.add('unavailable');
      }
    } else {
      row.setAttribute('hidden', true);
    }

    if (gender.textContent === "m") {
      row.classList.add('male');
    } else if (gender.textContent === "f") {
      row.classList.add('female');
    }

    if (parseInt(age.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  });
}
