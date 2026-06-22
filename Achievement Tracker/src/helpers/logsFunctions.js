import {
  getLocalStorageItem,
  setLocalStorageItem,
  deleteLocalStorage,
} from "./localStorage";

export function getInitialLogsArray() {
  const key = "logsData";
  const result = getLocalStorageItem(key);
  if (!result) {
    return [];
  }
  return result;
}

export function setLogsLocalStorage(items) {
  const key = "logsData";
  setLocalStorageItem(key, items);
}

export function deleteLogsLocalStorage() {
  const key = "logsData";
  deleteLocalStorage(key);
}
