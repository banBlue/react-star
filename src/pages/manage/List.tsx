import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Typography, Spin, Empty } from 'antd';
import QuestionCard from '../../compontents/QuestionCard';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {QuestionType} from '../../type/index'
import { getQuestionList } from '../../services/question';
import { useRequest, useDebounceFn } from 'ahooks';
import {useSearchParams} from 'react-router-dom'

import { SEARCH_KEY, PAGE_KEY, PAGE_SIZE_KEY  } from '../../constant';

const { Title } = Typography;

const List: React.FC = () => {
  const [requireDone, setRequireDone] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const [list, setList] = useState<QuestionType[]>([])
  const [total, setTotal] = useState<number>(0)
  const haveMore = total > list.length

  const [searchParams] = useSearchParams()

  const {run:_queryList, loading} = useRequest(async () => {
    const params = {
      [SEARCH_KEY]: searchParams.get(SEARCH_KEY) ||  '',
      [PAGE_KEY]: page, 
      [PAGE_SIZE_KEY]: pageSize
    }    
    const data = await getQuestionList(params)
    return data
  },{
    manual: true,
    onSuccess: (result) => {
      const {list: dataList = [], total: dataTotal = 0 } = result
      setList(list.concat(dataList))
      setTotal(dataTotal)
      setPage(page + 1)
      console.log('dataList',dataList)
    }
  })

  const containerRef = useRef<HTMLDivElement>(null)

  // 防抖查询分页列表
  const {run: tryLoadMore} = useDebounceFn(() => {
    const elem = containerRef.current
    if(!elem) return
    const domRect = elem.getBoundingClientRect()
    if(!domRect) return
    if(domRect.bottom <= window.innerHeight) {
      _queryList()
      setRequireDone(true)
    }
   
  }, {
    wait: 300
  })

  useEffect(() => {
    setPage(1)
    setList([])
    setTotal(0)
    setRequireDone(false)
    tryLoadMore()
  },[searchParams])

  useEffect(() => {
    if(haveMore) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  },[searchParams, haveMore])

  const dom = useMemo(() => {
    if(!requireDone || loading) return <Spin />
    if(total === 0) return <Empty description="暂无问卷" />
    if(!haveMore) return '没有更多了'
    return <span>加载中...</span>
  },[requireDone, haveMore, loading, total])
  return (
    <>
      <div className={ListStyles.title}>
        <div className={ListStyles.left}>
          <Title level={2}>我的问卷</Title>
        </div>
        <div className={ListStyles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={ListStyles.content}>
        {list.map((item:QuestionType) => (
          <QuestionCard key={item._id} title={item.title} isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createdAt={item.createdAt} _id={item._id} />
        ))}
      </div>

      <div className={ListStyles.footer} ref={containerRef}>{dom}</div>
    </>
  );
};

export default List;
