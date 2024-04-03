const expensive = {
  form: document.querySelector("#expensive-modal form"),
  updateForm: document.querySelector("#update-expensive-modal form"),
  description: document.querySelector("#expensive-description"),
  updateDescription: document.querySelector('#update-expensive-modal .description'),
  updateValue: document.querySelector('#update-expensive-modal .value'),
  updateId: document.querySelector('#update-expensive-modal input[type="hidden"]'),
  value: document.querySelector("#expensive-value"),
  category: document.querySelector("#expensive-select"),
  warn: document.querySelector("#expensive-warn"),
  table: document.querySelector('#expensive-table'),
  tableBody: document.querySelector('#expensive-table tbody'),
  btn: document.querySelector("#expensive-btn"),
  closeBtn: document.querySelector('#update-expensive-modal .btn-close'),
  deleteBtn: document.querySelector('#delete-expensive'),

  clearForm: () => {
    expensive.description.value = '';
    expensive.value.value = '';
  },

  adjust: (params) => {
    const { description, value, id } = params;
    expensive.updateDescription.value = description;
    expensive.updateValue.value = value;
    expensive.updateId.value = id;
  },

  update: (event) => {
    event.preventDefault();
    const expensives = expensive.getExpensives();
    const updatedExpensives = expensives.map(exp => {
      if (exp.id === expensive.updateId.value){
        return {
          ...exp,
          description: expensive.updateDescription.value,
          value: expensive.updateValue.value
        }
      }
      return exp;
    });

    expensive.setExpensives(updatedExpensives);
    expensive.closeBtn.click();
    window.detail.setExpensives();
  },

  delete: () => {
    const expensives = expensive.getExpensives();
    const id = expensive.updateId.value;
    const expensivesAfterRemove = expensives.filter(exp => exp.id != id);
    expensive.setExpensives(expensivesAfterRemove);
    expensive.closeBtn.click();
    window.detail.setExpensives();
  },

  addMessage: () => {
    expensive.warn.textContent = `O gasto ${expensive.description.value} foi adicionado!`;
    expensive.warn.classList.remove(...expensive.warn.classList);
    expensive.warn.classList.add('text-success');
    expensive.warn.classList.add('fw-bold');
  },

  updateTable: () => {
    const categories = window.category.getAll();
    const expensives = expensive.getExpensives();

    expensive.tableBody.innerHTML = '';

    categories.forEach(item => {
      const { name, value, id } = item;
      let sumOfExpensives = 0;
      const filteredExpensives = expensives.filter(exp => exp.category === item.id);
      filteredExpensives.forEach(exp => {
        sumOfExpensives += parseFloat(exp.value);
      });

      const difference = parseFloat(item.value) - parseFloat(sumOfExpensives);
      
      const tr = document.createElement('tr');
      tr.setAttribute('data-bs-toggle', 'modal');
      tr.setAttribute('data-bs-target', '#update-category-modal');
      tr.addEventListener('click', () => window.category.adjust({ name, value, id }));
      tr.innerHTML = `
        <td>${item.name}</td>
        <td class="text-center">$${item.value}</td>
        <td class="text-danger text-center">$${sumOfExpensives}</td>
        <td class="fw-bold text-success text-center">$${difference}</td>
      `;

      expensive.tableBody.appendChild(tr);
    });
  },

  hideTable: () => {
    expensive.table.classList.add('visually-hidden');
  },

  objAdapter: () => {
    return {
      description: expensive.description.value,
      value: expensive.value.value,
      category: expensive.category.value,
      id: window.id.generate()
    };
  },

  arrayAdpter: (expensives, expensiveObj) => {
    return [
      ...expensives,
      expensiveObj
    ];
  },

  getExpensives: () => {
    const expensives = JSON.parse(localStorage.getItem('EXPENSIVES'));
    if (expensives === null) return [];
    return expensives;
  },

  setExpensives: (value) => {
    const strinfiedValue = JSON.stringify(value);
    localStorage.setItem('EXPENSIVES', strinfiedValue);
  },

  setSelect: () => {
    expensive.category.innerHTML = '';
    const categories = window.category.getAll();
    categories.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      expensive.category.appendChild(option);
    });
  },

  deleteByCategoryId: (categoryId) => {
    const expensives = expensive.getExpensives();
    const removedExpensives = expensives.filter(exp => exp.category != categoryId);
    expensive.setExpensives(removedExpensives);
    expensive.updateTable();
  },

  add: (event) => {
    event.preventDefault();
    const expensives = expensive.getExpensives();
    const expensiveObj = expensive.objAdapter();
    const expensiveArray = expensive.arrayAdpter(expensives, expensiveObj);
    expensive.setExpensives(expensiveArray);
    expensive.addMessage();
    expensive.clearForm();
    expensive.updateTable();
  }
};

window.expensive = expensive;
