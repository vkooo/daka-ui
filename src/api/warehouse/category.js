import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'warehouse/category/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'warehouse/category/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'warehouse/category/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'warehouse/category/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'warehouse/category/delete/' + id,
    method: 'delete',
  })
}