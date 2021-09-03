import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { DARK_MODE, LANGUAGE } from 'constants/storage';
import { LanguageType } from 'interfaces/system';

const { REACT_APP_CRYPTO_KEY: CRYPTO_KEY } = process.env;
const encryptData = str => AES.encrypt(str, CRYPTO_KEY).toString();
const decryptData = str =>
  str && AES.decrypt(str, CRYPTO_KEY).toString(encUtf8);

// Local storage
function setLocalStorage(key, rawValue) {
  const value =
    typeof rawValue === 'string' ? rawValue : JSON.stringify(rawValue);
  localStorage.setItem(key, encryptData(value));
}

function getLocalStorage(key) {
  let value;
  try {
    value = decryptData(localStorage.getItem(key));
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

const customLocalStorage = {
  get: getLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
};

// Dark mode
const getDarkMode = (): boolean => customLocalStorage.get(DARK_MODE);
const setDarkMode = (value: boolean) =>
  customLocalStorage.set(DARK_MODE, value);
const removeDarkMode = () => customLocalStorage.remove(DARK_MODE);

// Language
const getLanguage = (): LanguageType => customLocalStorage.get(LANGUAGE);
const setLanguage = (value: LanguageType) =>
  customLocalStorage.set(LANGUAGE, value);
const removeLanguage = () => customLocalStorage.remove(LANGUAGE);

export {
  getDarkMode,
  setDarkMode,
  removeDarkMode,
  getLanguage,
  setLanguage,
  removeLanguage,
};
