import axios from 'axios'
import {message} from 'antd'
import { getUserToken } from '../utils/user'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 请求拦截器-携带token
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getUserToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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