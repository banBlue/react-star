import React, {useState} from 'react';
import { Typography, Empty  } from 'antd';
import QuestionCard from '../../compontents/QuestionCard';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {StarOutlined} from '@ant-design/icons'
const { Title } = Typography;

// 问题数据
const rawQuestionList = [
  {
    id: 1,
    title: '问题1',
    content: '问题1的内容',
    isPublished: false,
    isStar:true,
    answerCount: 0,
    createTime: '2023-01-01',
  },
  {
    id: 2,
    title: '问题2',
    content: '问题2的内容',
    isPublished: true,
    isStar:false,
    answerCount: 0,
    createTime: '2023-01-01',
  },
  {
    id: 3,
    title: '问题3',
    content: '问题3的内容',
    isPublished: true,
    isStar:true,
    answerCount: 0,
    createTime: '2023-01-01',
  },
  {
    id: 4,
    title: '问题4',
    content: '问题4的内容',
    isPublished: true,
    isStar:false,
    answerCount: 0,
    createTime: '2023-01-01',
  },
]

const Star: React.FC = () => {
  const [qList, setQList] = useState(rawQuestionList);
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
          qList.length === 0 && <Empty />
        }
        {
          qList.length > 0 && qList.map((item) => (
            <QuestionCard key={item.id} title={item.title} content={item.content} isPublished={item.isPublished} isStar={item.isStar} answerCount={item.answerCount} createTime={item.createTime} id={item.id} />
          ))
        }
      </div>

      <div className={ListStyles.footer}>当我是个页脚咯</div>
    </>
  );
};

export default Star;
