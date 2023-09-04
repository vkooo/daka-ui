import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'finance/withdrawal/lists',
    method: 'get',
    params: data
  })
}

export function refuse(data) {
  return request({
    url: 'finance/withdrawal/refuse',
    method: 'post',
    params: data
  })
}

export function agree(data) {
  return request({
    url: 'finance/withdrawal/agree',
    method: 'post',
    params: data
  })
}