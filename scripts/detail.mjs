const detail = {
  select: document.querySelector('#detail-select'),
  form: document.querySelector('#detail-modal form'),
  btn: document.querySelector('#detail-btn'),
  categoryText: document.querySelector('#detail-table h3'),
  table: document.querySelector('#detail-table'),
  tableBody: document.querySelector('#detail-table tbody'),
  modal: document.querySelector('#detail-modal'),
  closeBtn: document.querySelector('#detail-modal .btn-close'),

  setSelect: () => {
    detail.select.innerHTML = '';
    const categories = window.category.getAll();
    categories.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      detail.select.appendChild(option);
    });
  },

  showExpensives: (expensives) => {
    detail.tableBody.innerHTML = '';
    expensives.forEach(exp => {
      const { description, value, id } = exp;
      const tr = document.createElement('tr');
      tr.setAttribute('data-bs-toggle', 'modal');
      tr.setAttribute('data-bs-target', '#update-expensive-modal');
      tr.addEventListener('click', () => window.expensive.adjust({ description, value, id }));
      tr.innerHTML = `
        <td>${exp.description}</td>
        <td class="text-center">$${exp.value}</td>
      `;
      detail.tableBody.appendChild(tr);
    })
  },

  setExpensives: () => {
    const category = detail.select.value;
    const expensives = window.expensive.getExpensives();
    const filteredExpensives = expensives.filter(exp => exp.category === category);
    detail.showExpensives(filteredExpensives);
  },

  showTable: () => {
    detail.table.classList.remove('visually-hidden');
  },

  setCategory: () => {
    const category = window.category.getById(detail.select.value);;
    detail.categoryText.textContent = category.name;
  },

  closeModal: () => {
    detail.closeBtn.click();
  },

  show: (event) => {
    event.preventDefault();
    window.expensive.hideTable();
    detail.showTable();
    detail.setCategory();
    detail.setExpensives();
    detail.closeModal();
  }

}

window.detail = detail;