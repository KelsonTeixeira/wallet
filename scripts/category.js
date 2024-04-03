const category = {
  form: document.querySelector("#category-modal form"),
  updateForm: document.querySelector("#update-category-modal form"),
  name: document.querySelector("#category-name"),
  updateName: document.querySelector("#category-update-name"),
  value: document.querySelector("#category-value"),
  updateValue: document.querySelector("#category-update-value"),
  updateId: document.querySelector("#category-update-id"),
  deleteBtn: document.querySelector("#delete-category"),
  warn: document.querySelector("#category-warn"),
  closeBtn: document.querySelector('#update-category-modal .btn-close'),

  getAll: () => {
    const categories = JSON.parse(localStorage.getItem('CATEGORIES'));
    if (categories === null) return [];
    return categories;
  },

  getById: (id) => {
    const categories = category.getAll();
    const filterItem = categories.filter(cat => cat.id === id);
    return filterItem[0];
  },

  save: (value) => {
    const strinfiedValue = JSON.stringify(value);
    localStorage.setItem('CATEGORIES', strinfiedValue);
  },

  clearForm: () => {
    category.name.value = '';
    category.value.value = '';
  },

  adjust: (params) => {
    const { name, value, id } = params;
    category.updateName.value = name;
    category.updateValue.value = value;
    category.updateId.value = id;
  },

  update: (event) => {
    event.preventDefault();
    const categories = category.getAll();
    const updatedCategories = categories.map(cat => {
      if (cat.id === category.updateId.value){
        return {
          ...cat,
          name: category.updateName.value,
          value: category.updateValue.value
        }
      }
      return cat;
    });

    category.save(updatedCategories);
    category.closeBtn.click();
    window.expensive.updateTable();
  },

  delete: () => {
    const categories = category.getAll();
    const id = category.updateId.value;
    const removedCategories = categories.filter(cat => cat.id != id);
    category.save(removedCategories);
    window.expensive.deleteByCategoryId(id);
    category.closeBtn.click();
    window.expensive.updateTable();
  },

  objAdapter: () => {
    const name = category.name.value;
    const value = category.value.value;
    return {
      name,
      value,
      id: window.id.generate()
    }
  },

  validate: (categorys) => {
    if (categorys.length === 0) return true;
    const itemExists = categorys.find(item => item.name === category.name.value);
    if (itemExists) return false;
    return true;
  },

  notValid: () => {
    category.warn.textContent = `A categoria ${category.name.value} já existe!`;
    category.warn.classList.remove(...category.warn.classList);
    category.warn.classList.add('text-danger');
    category.warn.classList.add('fw-bold');
  },
  
  addMessage: () => {
    category.warn.textContent = `A categoria ${category.name.value} foi adicionado!`;
    category.warn.classList.remove(...category.warn.classList);
    category.warn.classList.add('text-success');
    category.warn.classList.add('fw-bold');
  },

  add: (event) => {
    event.preventDefault();
    const categoryObj = category.objAdapter();
    const categorys = category.getAll();
    const isValid = category.validate(categorys);
    if (!isValid) return category.notValid();
    categorys.push(categoryObj);
    category.save(categorys);
    category.addMessage();
    category.clearForm();
    window.expensive.updateTable();
  },
};

window.category = category;