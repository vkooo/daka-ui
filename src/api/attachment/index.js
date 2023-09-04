import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'attachment/lists',
    method: 'get',
    params: data
  })
}

export function fileMd5(params) {
  return request({
    url: 'attachment/fileMd5',
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: 'attachment/delete/' + id,
    method: 'delete',
  })
}

export function editName(data) {
  return request({
    url: 'attachment/editName',
    method: 'put',
    data
  })
}

export function move(data) {
  return request({
    url: 'attachment/move',
    method: 'put',
    data
  })
}