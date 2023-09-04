import request from '@/utils/request'

export function lists(data) {
  return request({
    url: 'member/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'member/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: 'member/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'member/update',
    method: 'put',
    data
  })
}

export function setMoney(data) {
  return request({
    url: 'member/setMoney',
    method: 'put',
    data
  })
}

export function setScore(data) {
  return request({
    url: 'member/setScore',
    method: 'put',
    data
  })
}

export function setPassword(data) {
  return request({
    url: 'member/setPassword',
    method: 'put',
    data
  })
}

export function setAgent(data) {
  return request({
    url: 'member/setAgent',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'member/delete/' + id,
    method: 'delete',
  })
}