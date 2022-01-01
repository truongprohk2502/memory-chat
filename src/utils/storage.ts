import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import {
  ADVANCE_MEDIA_SETTING,
  CAM_AND_MIC_STATE,
  DARK_MODE,
  LANGUAGE,
  MEDIA_DEVICE_SETTING,
  NOTIFICATION_SETTING,
  ROLE,
  TOKEN,
} from 'constants/storage';
import { LanguageType } from 'interfaces/system';
import {
  IAdvanceMediaSetting,
  ICamAndMicState,
  IMediaDeviceSetting,
  INotificationSetting,
} from 'interfaces/storage';
import { RoleType } from 'constants/roles';

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

// Notification
const getNotificationSetting = (): INotificationSetting =>
  customLocalStorage.get(NOTIFICATION_SETTING);
const setNotificationSetting = (value: INotificationSetting) =>
  customLocalStorage.set(NOTIFICATION_SETTING, value);
const removeNotificationSetting = () =>
  customLocalStorage.remove(NOTIFICATION_SETTING);

// Token
const getToken = (): string => customLocalStorage.get(TOKEN);
const setToken = (value: string) => customLocalStorage.set(TOKEN, value);
const removeToken = () => customLocalStorage.remove(TOKEN);

// Role
const getRole = (): RoleType => customLocalStorage.get(ROLE);
const setRole = (value: RoleType) => customLocalStorage.set(ROLE, value);
const removeRole = () => customLocalStorage.remove(ROLE);

// Media devices setting
const getMediaDeviceSetting = (): IMediaDeviceSetting =>
  customLocalStorage.get(MEDIA_DEVICE_SETTING);
const setMediaDeviceSetting = (value: IMediaDeviceSetting) =>
  customLocalStorage.set(MEDIA_DEVICE_SETTING, value);
const removeMediaDeviceSetting = () =>
  customLocalStorage.remove(MEDIA_DEVICE_SETTING);

// Advance media setting
const getAdvanceMediaSetting = (): IAdvanceMediaSetting =>
  customLocalStorage.get(ADVANCE_MEDIA_SETTING);
const setAdvanceMediaSetting = (value: IAdvanceMediaSetting) =>
  customLocalStorage.set(ADVANCE_MEDIA_SETTING, value);
const removeAdvanceMediaSetting = () =>
  customLocalStorage.remove(ADVANCE_MEDIA_SETTING);

// Camera and microphone state
const getCamAndMicState = (): ICamAndMicState =>
  customLocalStorage.get(CAM_AND_MIC_STATE);
const setCamAndMicState = (value: ICamAndMicState) =>
  customLocalStorage.set(CAM_AND_MIC_STATE, value);
const removeCamAndMicState = () => customLocalStorage.remove(CAM_AND_MIC_STATE);

export {
  getDarkMode,
  setDarkMode,
  removeDarkMode,
  getLanguage,
  setLanguage,
  removeLanguage,
  getNotificationSetting,
  setNotificationSetting,
  removeNotificationSetting,
  getToken,
  setToken,
  removeToken,
  getRole,
  setRole,
  removeRole,
  getMediaDeviceSetting,
  setMediaDeviceSetting,
  removeMediaDeviceSetting,
  getAdvanceMediaSetting,
  setAdvanceMediaSetting,
  removeAdvanceMediaSetting,
  getCamAndMicState,
  setCamAndMicState,
  removeCamAndMicState,
};
