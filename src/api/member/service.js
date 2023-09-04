import request from '@/utils/request'

export function edit(id = 0) {
  return request({
    url: 'member/service/' + (id > 0? id: ""),
    method: 'get',
  })
}

export function update(memberId, data) {
  return request({
    url: 'member/service/' + memberId,
    method: 'post',
    data
  })
}
