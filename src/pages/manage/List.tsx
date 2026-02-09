import React, {useState} from 'react';
import { Typography, Spin } from 'antd';
import QuestionCard from '../../compontents/QuestionCard';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {QuestionType} from '../../type/index'
import useQuestionList from '../../hooks/useQuestionList'

const { Title } = Typography;

const List: React.FC = () => {
  const {list, total, loading} = useQuestionList()
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
        {loading && <Spin/>}
        {
          !loading && list.length && list.map((item:QuestionType) => (
            <QuestionCard key={item.id} title={item.title} isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createdAt={item.createdAt} id={item.id} />
          ))
        }
      </div>

      <div className={ListStyles.footer}>当我是个页脚咯</div>
    </>
  );
};

export default List;
