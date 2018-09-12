import request from '../request'
import Url from '../api'
import { setItem } from '@/utils'
export default {
  // login
  login({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      console.log(payload)
      if (payload.code !== state.phoneCode) {
        reject('code is err')
      }
      request.post(Url.login, {
        phone: payload.phoneNum,
        code: state.phoneCode,
        password: payload.phonePass
      }).then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  getUserHouseInfo({
    commit,
    state
  }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.getUserHouseInfo, {
        zukePhone: payload.phone
      }).then(res => {
        commit('savePhone', payload.phone)
        if (res.status.code === '200') {
          setItem('userHouseInfo', res.result.list);
        }
      })
    })
  },
  getNum({ commit, state }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      const key = payload === 'bookNum' ? 'zukePhone' : 'phone'
      request.post(Url[payload], { [key]: state.userPhone })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  // collect
  getCollect({ commit, state }) {
    return new Promise((resolve, reject) => {
      request.post(Url.collectNum, { phone: state.userPhone })
        .then(res => resolve(res))
        .catch(error => resolve(error))
    })
  },
  delCollect({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.delCollect, { houseId: payload, phone: state.userPhone }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // getFoot
  getFoot({ commit, state }) {
    return new Promise((resolve, reject) => {
      request.post(Url.footNum, { phone: state.userPhone }).then(res => {
        resolve(res)
      }).catch(error => {
        resolve(error)
      })
    })
  },
  //  cancelOrder 预约
  cancelOrder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.cancelOrder, { ...payload })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  // cancelBook 预定
  cancelBook({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.cancelBook, { ...payload })
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  },
  // my/zhengzhu/about
  getHouseInfo({ commit, state }, payload) {
    payload.phone = state.userPhone
    return new Promise((resolve, reject) => {
      request.post(Url.getHouseInfo, { ...payload }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // my/zhengzhu/orderHouse
  getOrderHouse({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.getOrderHouse, { ...payload }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  bookHouse({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.bookHouse, { ...payload }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  bookPay({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.bookPay, { ...payload }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //
  getCode({
    commit,
    state
  }, phone) {
    return new Promise((resolve, reject) => {
      request.post(Url.getCode, {
        phone
      }).then(res => {
        if (res.status.code === '200') {
          commit('getPhoneCode', res.result.code)
        } else {
          wx.showToast({
            title: '系统错误，请联系管理员',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    })
  },
  //
  getCity({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      request.post(Url.getCityUrl, {}, {
        title: 'getMoreCity'
      }).then(res => {
        console.log(res)
        commit('getCity', res.result.list)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  getBanners({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      request.post(Url.getBannersUrl, {
        equipment: '2',
        location: '1'
      }, {
        title: 'getBanners'
      }).then(res => {
        resolve(res.result)
      }).catch(error => {
        reject(error)
        console.log(error)
      })
    })
  },
  getMenDianList({
    commit,
    state
  }, payload) {
    return new Promise((resolve, reject) => {
      request.post(Url.getMenDianList, {
        hiCityId: payload,
        pageNo: '1',
        pageSize: '5'
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
