import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/loginOut',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/getUserInfo',
    method: 'get'
  })
}

