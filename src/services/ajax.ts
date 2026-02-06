import axios from 'axios'
import {message} from 'antd'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  const {errno , msg, data = {}} = (response.data || {}) as Response
  if(errno !==0 ){
    msg && message.error(msg)      
    return Promise.reject(msg)
  }
  return data as any
})

export default instance

export type Response = {
  errno: number
  data: ResponseDataType
  msg: string
}

export type ResponseDataType = {
  [key:string]: any
}