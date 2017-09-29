import fetch from '@/utils/fetch'

export function getLogInfo(query) {
  return fetch({
    url: '/sysLog/getLogInfo',
    method: 'post',
    params: query
  })
}

export function getLogType() {
  return fetch({
    url: '/sysLog/getLogType',
    method: 'post'
  })
}
