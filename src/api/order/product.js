import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'order/product/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'order/product/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}