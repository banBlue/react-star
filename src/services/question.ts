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
}
export async function getQuestionList(params:Partial<OptType>): Promise<ResponseDataType> {
  return  await instance.get<ResponseDataType>('/api/questionList',{params})
}

export const createQuestion: () => Promise<ResponseDataType> = async () => {
  return await instance.post<ResponseDataType>('/api/question')
}