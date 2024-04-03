const id = {
  generate: () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
    return timestamp + '-' + randomString;
  }
}

window.id = id;