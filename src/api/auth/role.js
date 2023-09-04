import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'role/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'role/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function changeStatus(id, e) {
  return request({
    url: `role/status/${id}/${e}`,
    method: 'put',
  })
}

export function create(data) {
  return request({
    url: 'role/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'role/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'role/delete/' + id,
    method: 'delete',
  })
}