import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'member/level/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'member/level/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'member/level/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'member/level/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'member/level/delete/' + id,
    method: 'delete',
  })
}