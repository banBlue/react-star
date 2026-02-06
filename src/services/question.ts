import instance, { Response, ResponseDataType } from './ajax'

export async function getQuestionList(id: number): Promise<ResponseDataType> {
  return  await instance.get<ResponseDataType>('/api/question/' + id)
}

export const createQuestion: () => Promise<ResponseDataType> = async () => {
  return await instance.post<ResponseDataType>('/api/question')
}