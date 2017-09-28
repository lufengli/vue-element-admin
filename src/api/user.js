import fetch from '@/utils/fetch'

export function getAllSysUsers(query) {
  return fetch({
    url: '/sysUser/getAllSysUsers',
    method: 'post',
    params: query
  })
}

export function getSysUsers(query) {
  return fetch({
    url: '/sysUser/getSysUsers',
    method: 'post',
    params: query
  })
}

export function addSysUser(userInfo) {
  return fetch({
    url: '/sysUser/addSysUser',
    method: 'post',
    params: userInfo
  })
}
