import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import RightToolbar from "@/components/RightToolbar"
import Pagination from "@/components/Pagination"
import VkPicture from "@/components/VkPicture"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import GlobalException from '@/exception/GlobalException'

import '@/styles/index.scss' // global css
import "./styles/global.scss";

import App from './App'
import store from './store'
import router from './router'

import './assets/icons' // icon

import '@/permission' // permission control

import directive from './directive' // directive

Vue.use(directive)

Vue.component('RightToolbar', RightToolbar)
Vue.component('Pagination', Pagination)
Vue.component('VkPicture', VkPicture)

store.dispatch('website/init');

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

Vue.config.productionTip = false

Vue.prototype.$throw = function (msg = "Error") {
  ElementUI.Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
	throw new GlobalException(msg);
};

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
