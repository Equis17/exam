import request from '@/utils/request'

export const submitAnswer = (data) => request.post('/studentAnswer/submitAnswer', data)
export const page = (params) => request.get('/studentAnswer/page', { params })
export const deleteByIds = (ids) => request.post('/studentAnswer/deleteByIds', ids)
export const getNextId = (params) => request.get('/studentAnswer/getNextId', { params })
