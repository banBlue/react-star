import { useParams } from 'react-router-dom'
import {useRequest} from 'ahooks'
import { getQuestionList } from '../services/question'

const useLoadQuestion = () =>{
  const {id} = useParams()
  const fn = async () => {
    return await getQuestionList(Number(id))
  }
  const {data, error, loading} = useRequest(fn)

  return {
    data,
    error,
    loading
  }
}

export default useLoadQuestion