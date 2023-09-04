import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'notice/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'notice/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'notice/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'notice/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'notice/delete/' + id,
    method: 'delete',
  })
}