import { getTitle, getToken, setTitle, setToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/401', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  if (to.query.userId) {
    setToken(to.query.userId)
  }
  if (to.query.titleId) {
    setTitle(to.query.titleId)
  }
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const hasTitle = getTitle()
  if (hasToken && hasTitle) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/401`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
