export function getLocalStorageItem(key) {
  try {
    const json = localStorage.getItem(key);
    if (!json) return false;
    const result = JSON.parse(json);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function setLocalStorageItem(key, items) {
  try {
    const json = JSON.stringify(items);
    localStorage.setItem(key, json);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function deleteLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}
