import request from '@/utils/request.js'
export function register(data) {
    return request({
      url: '/api/start/register',
      method: 'post',
      data: data
    })
  }