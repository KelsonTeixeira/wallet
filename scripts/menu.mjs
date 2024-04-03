const menu = {
  btn: document.querySelector('.navbar-toggler'),
  collapse: document.querySelector('.navbar-collapse'),

  toggle: () => {
    const isOpen = menu.collapse.getAttribute('is-open');
    if(isOpen === 'true') {
      menu.collapse.classList.remove('show');
      menu.collapse.setAttribute('is-open', 'false');
      return;
    }

    menu.collapse.classList.add('show');
    menu.collapse.setAttribute('is-open', 'true');
  }
}

window.menu = menu;