function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  checkMobile
}

export const checkMobile = phone => {
  if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
    return false
  }
  return true
}

export const showToast = (params) => {
  wx.showToast({
    title: params.title || '验证码错误',
    icon: params.icon || 'none',
    duration: params.time || 2000
  })
}

export const setItem = (name, value) => {
  wx.setStorageSync(name, value)
}
export const getItem = (name) => {
  return wx.getStorageSync(name)
}
export const delItems = (name) => {
  wx.removeStorageSync(name)
}