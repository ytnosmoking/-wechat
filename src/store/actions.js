import request from '../request'
import Url from '../api'
export default {
  getCity({
    commit,
    state
  }) {
    request.post(Url.getCityUrl, {}, {
      title: 'getMoreCity'
    }).then(res => {
      console.log(res)
      commit('getCity', res.result.list)
    }).catch(err => {
      console.log(err)
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
  }
}
