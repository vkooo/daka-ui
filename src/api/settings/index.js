import request from '@/utils/request'

export function get(name, key = "") {
  return request({
    url: 'settings/setting/get/'+ name + "/" + key,
    method: 'get',
  })
}

export function save(data) {
    return request({
      url: 'settings/setting/save',
      method: 'post',
      data
    })
}