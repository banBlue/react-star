import instance, {  ResponseDataType } from './ajax'

export async function getQuestion(id: number): Promise<ResponseDataType> {
  return  await instance.get<ResponseDataType>('/api/question/' + id)
}

type OptType = {
  isStar: boolean
  isPublished: boolean
  keyword: string
  page: number
  pageSize: number
  isDeleted: boolean
}
export async function getQuestionList(params:Partial<OptType>): Promise<ResponseDataType> {
  return  await instance.get<ResponseDataType>('/api/question',{params})
}

export const createQuestion: () => Promise<ResponseDataType> = async () => {
  return await instance.post<ResponseDataType>('/api/question')
}

// 编辑问卷状态
export async function updateQuestionService(id:string, params: Partial<OptType>):Promise<ResponseDataType> {
  return await instance.patch<ResponseDataType>('/api/question/' + id, params) 
}

// 复制问卷
export async function duplicateQuestionService(id:string): Promise<ResponseDataType> {
  return await instance.post<ResponseDataType>('/api/question/duplicate/' + id)
}

// 批量删除问卷
export async function deleteQuestionService(params: {ids: string[]}): Promise<ResponseDataType> {
  return await instance.delete<ResponseDataType>('/api/question', {params})
}