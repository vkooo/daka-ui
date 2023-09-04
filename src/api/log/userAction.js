import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'log/userAction/lists',
    method: 'get',
    params: data
  })
}