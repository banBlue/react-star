import React from "react";
import { getQuestionList } from '../services/question';
import { useRequest } from 'ahooks';
// import {QuestionType} from '../../type/index'
import { useSearchParams } from "react-router-dom";
import { SEARCH_KEY, PAGE_KEY, PAGE_SIZE_KEY } from '../constant';

type OptType = {
  isStar: boolean
  isDeleted: boolean
  keyword: string
  page: number
  pageSize: number
}

const useQustionList = (opt:Partial<OptType> = {isDeleted: false, isStar: false}) => {
  const [searchParams] = useSearchParams();
  const {data = {}, loading} = useRequest(async () => {
    const obj = {...opt}
    obj[SEARCH_KEY] = searchParams.get(SEARCH_KEY) ||  ''
    obj.page = Number(searchParams.get(PAGE_KEY)) || 1
    obj.pageSize = Number(searchParams.get(PAGE_SIZE_KEY)) || 10

    const data = await getQuestionList(obj)
    return data
  }, {
    refreshDeps: [searchParams] // 监听刷新,相当于useEffect第二个参数
  })
  
  const list = data.list || []
  const total = data.total || 0

  return {list, total, loading}
}

export default useQustionList