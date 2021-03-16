import Vue from 'vue'
import ProgressBar from '@/views/xgy/ProgressBar'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.axios = axios

const Comp = Vue.extend(ProgressBar)
const bar = new Comp().$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

new Vue({
  router,
  store,
  render: (h) => { return h(App) },
}).$mount('#app')
