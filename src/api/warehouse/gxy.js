import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'warehouse/content/lists/2',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'warehouse/content/edit/' + (id > 0? id: 0) + "/2",
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'warehouse/content/create/2',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'warehouse/content/update/2',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'warehouse/content/delete/2/' + id,
    method: 'delete',
  })
}