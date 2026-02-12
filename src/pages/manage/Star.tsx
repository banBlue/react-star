import React, {useState} from 'react';
import { Typography, Empty  } from 'antd';
import QuestionCard from '../../compontents/QuestionCard';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {StarOutlined} from '@ant-design/icons'

import {QuestionType} from '../../type/index'
import useQuestionList from '../../hooks/useQuestionList'
import ListPage from '../../compontents/ListPage'

const { Title } = Typography;
const Star: React.FC = () => {
  const {list, total, loading} = useQuestionList({isStar:true})
  return (
    <>
      <div className={ListStyles.title}>
        <div className={ListStyles.left}>
          <Title level={2}><StarOutlined />星标问卷</Title>
        </div>
        <div className={ListStyles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={ListStyles.content}>
        {
          list.length === 0 && <Empty />
        }
        {
          list.length > 0 && list.map((item:QuestionType) => (
            <QuestionCard key={item._id} title={item.title}  isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createdAt={item.createdAt} _id={item._id} />
          ))
        }
      </div>

      <div className={ListStyles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
