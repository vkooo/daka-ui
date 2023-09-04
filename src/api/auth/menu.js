import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'menu/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'menu/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function changeStatus(id, e) {
  return request({
    url: `menu/status/${id}/${e}`,
    method: 'put',
  })
}

export function create(data) {
  return request({
    url: 'menu/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'menu/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'menu/delete/' + id,
    method: 'delete',
  })
}