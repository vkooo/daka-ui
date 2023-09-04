import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'attachment/category/lists',
    method: 'get',
    params: data
  })
}

export function allLists() {
    return request({
      url: 'attachment/category/all',
      method: 'get'
    })
  }

export function edit(id) {
    return request({
        url: 'attachment/category/edit/' +  (id > 0? id: ""),
        method: 'get',
    })
}

export function create(data) {
    return request({
      url: 'attachment/category/create',
      method: 'post',
      data
    })
  }

export function update(data) {
  return request({
    url: 'attachment/category/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'attachment/category/delete/' + id,
    method: 'delete',
  })
}