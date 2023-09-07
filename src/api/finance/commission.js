import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'finance/commission/lists',
    method: 'get',
    params: data
  })
}