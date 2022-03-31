import Cookies from 'js-cookie'

const TokenKey = 'sys_exam_user_id'
const UserIdKey = 'sys_exam_user_id'
const TitleIdKey = 'sys_exam_title_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getTitle() {
  return Cookies.get(TitleIdKey)
}

export function setTitle(token) {
  return Cookies.set(TitleIdKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(token) {
  return Cookies.set(UserIdKey, token)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}
