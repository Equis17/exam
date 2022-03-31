import Pagination from '@/components/Pagination'
import Tips from '@/components/Tips'
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css
import '@/assets/custom-theme/theme.scss'
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import * as vueUtils from '@/utils/vueUtils'

const {
  getOptsLabel,
  getConnectedStr,
  getOpts,
  getDictsLabel,
  addDateRange,
  resetForm,
} = vueUtils
Vue.prototype.getOptsLabel = getOptsLabel
Vue.prototype.getConnectedStr = getConnectedStr
Vue.prototype.addDateRange = addDateRange
Vue.prototype.getOpts = getOpts
Vue.prototype.resetForm = resetForm
Vue.prototype.getDictsLabel = getDictsLabel
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs
/* {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang, // 如果使用中文，无需设置，请删除
} */
Vue.use(Element)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.component('pagination', Pagination)
Vue.component('Tips', Tips)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
