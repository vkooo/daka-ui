import request from '@/utils/request'

export function get(key = "") {
  return request({
    url: 'settings/attachment/get/' + key,
    method: 'get',
  })
}

export function save(data) {
    return request({
      url: 'settings/wechat/save',
      method: 'post',
      data
    })
}

export function savePay(data) {
  return request({
    url: 'settings/wechat/savePay',
    method: 'post',
    data
  })
}