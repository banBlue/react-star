import { useParams } from 'react-router-dom'
import {useRequest} from 'ahooks'
import { getQuestion } from '../services/question'
import { useDispatch } from 'react-redux'
import {resetComponents} from '../store/componentsReduxer'
import { useEffect } from 'react'
import { message } from 'antd'

const useLoadQuestion = () =>{
  const {id} = useParams()
  const dispatch = useDispatch()

  const {data, error, loading, run} = useRequest(async () => {
    return await getQuestion(Number(id))
  }, {
    manual: true,
    onSuccess: (res) => {
      
    }
  })

  useEffect(() => {
    if(data) {
      if(data.componentList.length) {
        dispatch(resetComponents({componentsList: data.componentList, selectedId: data.componentList[0].fe_id}))
      }else {
        dispatch(resetComponents({componentsList: data.componentList, selectedId: ''}))
      }
    }
  }, [data])

  useEffect(() => {
    if(!id) {
      return message.error('问卷id获取失败')  
    }
    run()
  }, [id])

  return {
    data,
    error,
    loading
   }
}

export default useLoadQuestion