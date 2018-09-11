import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import 'animate.css/animate.min.css'
import MpVueRouterPatch from 'mpvue-router-patch'

Vue.use(MpVueRouterPatch)
Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
