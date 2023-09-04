import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'warehouse/content/lists/1',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'warehouse/content/edit/' + (id > 0? id: 0) + "/1",
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'warehouse/content/create/1',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'warehouse/content/update/1',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'warehouse/content/delete/1/' + id,
    method: 'delete',
  })
}