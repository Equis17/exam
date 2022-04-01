import request from '@/utils/request'

export const getSerialsNo = (params) => {return request({ url: '/serialsNo', method: 'get', params })}
export const fillBill = (data) => {return request({ url: '/fillBill', method: 'post', data })}
