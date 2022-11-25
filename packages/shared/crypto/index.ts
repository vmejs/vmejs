import { isObject, isString } from './../is/index';
import CryptoJS from 'crypto-js';

export interface IEncryptionParams {
  key?: string;
  iv?: string;
}

const DEFAULT_PARAMS = {
  key: 'vmevmevmevmevmev',
  iv: 'vmevmevmevmevmev',
};

export const encrypt = (word: object | string, encryptionOption: IEncryptionParams = DEFAULT_PARAMS) => {
  let encrypted: CryptoJS.lib.CipherParams;
  const { key = DEFAULT_PARAMS.key, iv = DEFAULT_PARAMS.iv } = encryptionOption;
  const parseKey = CryptoJS.enc.Utf8.parse(key);
  const parseIv = CryptoJS.enc.Utf8.parse(iv);
  if (isString(word)) {
    const message = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(message, parseKey, {
      iv: parseIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  }
  if (isObject(word)) {
    const data = JSON.stringify(word);
    const message = CryptoJS.enc.Utf8.parse(data);
    encrypted = CryptoJS.AES.encrypt(message, parseKey, {
      iv: parseIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  }
  return encrypted!.ciphertext.toString();
};

export const decrypt = (word: string, encryptionOption: IEncryptionParams = DEFAULT_PARAMS) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const { key = DEFAULT_PARAMS.key, iv = DEFAULT_PARAMS.iv } = encryptionOption;
  const parseKey = CryptoJS.enc.Utf8.parse(key);
  const parseIv = CryptoJS.enc.Utf8.parse(iv);
  const ciphertext = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(ciphertext, parseKey, {
    iv: parseIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
