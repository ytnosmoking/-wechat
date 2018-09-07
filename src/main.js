import Vue from 'vue'
import App from '@/App'
import store from '@/store'

import MpVueRouterPatch from 'mpvue-router-patch'

Vue.use(MpVueRouterPatch)
Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
