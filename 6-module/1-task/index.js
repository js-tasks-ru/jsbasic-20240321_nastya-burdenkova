export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
    this.elem.addEventListener("click", this.onDelete.bind(this));
  }

  createTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      `;
    thead.appendChild(headerRow);

    this.rows.forEach((rowData) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${rowData.name}</td>
              <td>${rowData.age}</td>
              <td>${rowData.salary}</td>
              <td>${rowData.city}</td>
              <td><button>X</button></td>
          `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
  }

  onDelete(event) {
    if (event.target.tagName === "BUTTON") {
      const tr = event.target.closest("tr");
      tr.remove();
    }
  }
}

let rows = [
  {
    name: "Вася",
    age: 25,
    salary: 1000,
    city: "Самара",
  },
  {
    name: "Петя",
    age: 30,
    salary: 1500,
    city: "Москва",
  },
];

let table = new UserTable(rows);
document.body.appendChild(table.elem);
