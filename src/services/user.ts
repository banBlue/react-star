import instance, {  ResponseDataType } from './ajax'

// 获取用户信息
export async function getUserInfo(): Promise<ResponseDataType> {
  return  await instance.get<ResponseDataType>('/api/user/info')
}

// 用户登录
export async function loginService(params:{ username: string, password: string}): Promise<ResponseDataType> {
  return await instance.post('/api/user/login' ,params)
}

// 用户注册
export async function registerService(params:{ username: string, password: string,nickname?: string}):Promise<ResponseDataType> {
  return await instance.post('/api/user/register' ,params)
}