export default {
  getCity(state, payload) {
    state.cityList = payload
  },
  cityCode(state, payload) {
    state.cityCode = payload
  }
}