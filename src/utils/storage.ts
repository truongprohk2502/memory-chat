import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { THEME_SETTING } from 'constants/storage';
import { IThemeMode } from 'interfaces/storage';

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

// Theme
const getThemeSetting = (): IThemeMode => customLocalStorage.get(THEME_SETTING);
const setThemeSetting = (value: IThemeMode) =>
  customLocalStorage.set(THEME_SETTING, value);
const removeThemeSetting = () => customLocalStorage.remove(THEME_SETTING);

export { getThemeSetting, setThemeSetting, removeThemeSetting };
