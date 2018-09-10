export default {
  // login
  getPhoneCode(state, payload) {
    console.log(payload)
    state.phoneCode = payload
  },
  getCity(state, payload) {
    state.cityList = payload
  },
  cityCode(state, payload) {
    state.cityCode = payload
  },
  savePhone(state, payload) {
    state.userPhone = payload
  }
}