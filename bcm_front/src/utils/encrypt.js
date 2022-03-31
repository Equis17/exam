import JSEncrypt from 'jsencrypt'
import api from '@/api'
export default async function(str) {
  const res = await api.common.getPublicKey()
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(res.data)
  return encrypt.encrypt(str)
}
