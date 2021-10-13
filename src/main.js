import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
  BootstrapVue,
  BootstrapVueIcons
} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import Notifications from 'vue-notification'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Notifications)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    formatNumber: (number) => {
      return 'Rp. ' + new Intl.NumberFormat('id').format(number)
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')