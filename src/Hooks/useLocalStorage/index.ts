import CryptoJS from 'crypto-js'

const Secret: string = 'secret key 123'

// 随机加密 randomKey 推荐采取token; data 加密的数据
const getRandomSubstring = (randomKey: string, data: string) => {
  const startIndex = Math.floor(Math.random() * (randomKey.length - 11));
  const randomSecret = randomKey.substr(startIndex, 10)
  return CryptoJS.AES.encrypt(JSON.stringify(data), randomSecret).toString()
}

// 封装数据加密方法
function encryptData(data: any) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), Secret).toString()
}

// 封装数据解密方法
function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, Secret)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedData)
}

// 封装本地存储方法
// 获取Value
const getLoc = (key: string, isDecry: boolean) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? (isDecry ? decryptData(storedValue) : JSON.parse(storedValue)) : null;
};

// 设置Value
const setLoc = (key: string, value: string | Array<any> | Object, isDecry: boolean) => {
  localStorage.setItem(key, JSON.stringify(isDecry ? encryptData(value) : value));
};

export default {
  encryptData,
  decryptData, 
  getLoc, 
  setLoc,
  getRandomSubstring
}
