var Fly = require('flyio/dist/npm/wx')
var request = new Fly()

const wechatId = '0d8151c8989f4c18991a56eaf9c2a70b'
const gcid = '0100099'

request.interceptors.request.use(config => {
  console.log(config)
  config.baseURL = 'https://serverpms.efanghang.com'
  config.body.gcid = gcid
  config.body.wechatId = wechatId
  config.body.userid = ''
  config.body.token = ''
  wx.showNavigationBarLoading()
  wx.showToast({
    title: config.title || 'loading',
    icon: 'loading',
    duration: 2000
  })
  return config
})

request.interceptors.response.use(response => {
  wx.hideNavigationBarLoading()
  wx.hideLoading()
  return Promise.resolve(response.data)
}, error => {
  wx.hideNavigationBarLoading()
  wx.showToast({
    title: error.message,
    icon: 'none'
  })
  console.log(error)
  return Promise.reject(error)
})

export default request