import { getToken, setToken, removeToken, setUserId, getUserId, removeUserId, } from '@/utils/auth'
import router, { resetRouter, } from '@/router'
import api from '@/api'

const state = {
  token: getToken(),
  userId: getUserId(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
}

const mutations = {
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit, }, userInfo) {
    const { username, password, } = userInfo
    return new Promise((resolve, reject) => {
      api.common.login({ username: username.trim(), password, }).then(response => {
        const { data, } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USER_ID', data.info.id)
        setToken(data.token)
        setUserId(data.info.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state, }) {
    return new Promise((resolve, reject) => {
      api.common.getLoginInfo({ id: getUserId(), }).then(response => {
        const { data, } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { role, name, avatar, desc, } = data

        // roles must be a non-empty array
        if (!role) {
          reject('用户未配置角色')
        }

        commit('SET_ROLES', [role.name, ])
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', desc)
        resolve({ ...data, roles: [data.role.name, ], })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch, }) {
    return new Promise((resolve, reject) => {
      api.common.logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_ID', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        removeUserId()
        dispatch('tagsView/delAllViews', null, { root: true, })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit, }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch, }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)

    const { roles, } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true, })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true, })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
