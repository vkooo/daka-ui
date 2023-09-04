import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'member/agent/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'member/agent/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'member/agent/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'member/agent/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'member/agent/delete/' + id,
    method: 'delete',
  })
}