import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'finance/capitalFlow/lists',
    method: 'get',
    params: data
  })
}