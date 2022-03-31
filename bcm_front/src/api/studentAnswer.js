import request from '@/utils/request'

export const singlePay = (data) => request.post('/singlePay', data)
export const searchSinglePay = (data) => request.post('/searchSinglePay', data)
export const delSinglePay = (params) => request.delete('/singlePay', { params })

