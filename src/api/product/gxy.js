import request from '@/utils/request'

export function get(data) {
return request({
    url: 'product/gxy',
    method: 'get',
    data
})
}

export function save(data) {
    return request({
        url: 'product/gxy',
        method: 'put',
        data
    })
}