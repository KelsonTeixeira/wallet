window.category.form.addEventListener("submit", (event) => window.category.add(event));
window.category.updateForm.addEventListener("submit", (event) => window.category.update(event));
window.category.deleteBtn.addEventListener('click', () => window.category.delete());

window.expensive.form.addEventListener("submit", (event) => window.expensive.add(event));
window.expensive.updateForm.addEventListener("submit", (event) => window.expensive.update(event));
window.expensive.btn.addEventListener('click', () => window.expensive.setSelect());
window.expensive.deleteBtn.addEventListener('click', () => window.expensive.delete());
window.expensive.updateTable();

window.detail.btn.addEventListener('click', () => window.detail.setSelect());
window.detail.form.addEventListener("submit", (event) => window.detail.show(event));

window.menu.btn.addEventListener('click', () => window.menu.toggle());
