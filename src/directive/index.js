import auth from './permission/hasAuth'
import throttle from './throttle'
import scrollbar from './scrollbar'

const install = function(Vue) {
  Vue.directive('auth', auth)
  Vue.directive('throttle', throttle)
  Vue.directive('fixed-scroll', scrollbar)
}
if (window.Vue) {
  window['auth'] = auth
  window['throttle'] = throttle
  window['fixed-scroll'] = scrollbar
  Vue.use(install);
}
auth.install = install
export default auth
