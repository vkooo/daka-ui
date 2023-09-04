import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}


export function getCodeImg() {
  return request({
    url: '/getCaptcha',
    method: 'get',
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function updateInfo(data) {
  return request({
    url: '/updateInfo',
    method: 'put',
    data
  })
}

export function updateUserPwd(data) {
  return request({
    url: '/updateUserPwd',
    method: 'put',
    data
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/uploadAvatar',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getRouters() {
  return request({
    url: 'getRouters',
    method: 'get'
  })
}

export function lists(data) {
  return request({
    url: 'user/lists',
    method: 'get',
    params: data
  })
}

export function edit(id = 0) {
  return request({
    url: 'user/edit/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function changeStatus(id, e) {
  return request({
    url: `user/status/${id}/${e}`,
    method: 'put',
  })
}

export function create(data) {
  return request({
    url: 'user/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'user/update',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'user/delete/' + id,
    method: 'delete',
  })
}