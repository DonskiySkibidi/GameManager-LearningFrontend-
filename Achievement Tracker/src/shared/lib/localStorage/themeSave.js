import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "@shared/lib/localStorage/localStorage";

export function getInitialTheme() {
  const key = "AppTheme";
  const result = getLocalStorageItem(key);
  if (!result) {
    return "dark";
  }
  return result;
}

export function setTheme(newTheme) {
  const key = "AppTheme";
  setLocalStorageItem(key, newTheme);
}
