import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const timeKey = 'hrsass-timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTiemStamp() {
  return Cookies.get(timeKey)
}
// 读取时间戳
export function setTiemStamp() {
  return Cookies.set(timeKey, Date.now())
}
