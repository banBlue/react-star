import React, {useState} from 'react';
import QuestionCardStyles from './QuestionCard.module.scss';
import classNames from 'classnames';
import { useNavigate, Link } from 'react-router-dom';
import { Tag, Space, Button, Divider, Modal, message, Popconfirm   } from 'antd' 
import {EditOutlined , LineChartOutlined,DeleteOutlined,CopyOutlined,StarOutlined , BookOutlined} from '@ant-design/icons'

type QuestionCardProps = {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
}

const QuestionCard:React.FC<QuestionCardProps> = (props:QuestionCardProps) => {
  const nav = useNavigate()
  const {id, title, content, isPublished, isStar, answerCount, createTime} = props;
  const classCard = classNames(QuestionCardStyles.card, {
    [QuestionCardStyles['is-published']]: isPublished,
    [QuestionCardStyles['is-star']]: isStar,
  })
  
  const confirmDelete = () => {
    Modal.confirm({
      title: '确认删除吗？',
      okText: '确认',
      okType: 'danger',
      onOk: () => {
        message.success('删除成功')
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  const handleCopy = () => {
    message.success('复制成功')
  }
  return (
    <div className={classCard}>
      <div className={QuestionCardStyles.title}>  
        <div className={QuestionCardStyles.divt}>
          <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
            {isStar ? <StarOutlined /> :  <BookOutlined /> }{title}
          </Link>
        </div>
        <div className={QuestionCardStyles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="gold">未发布</Tag>}
            <span>答案: {answerCount}</span>
            <span>{createTime}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={QuestionCardStyles.info}>
        <div className={QuestionCardStyles.left}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => {nav(`/question/edit/${id}`)}}>编辑问卷</Button>
            <Button type="text" size="small" icon={<LineChartOutlined />} onClick={() => {nav(`/question/stat/${id}`)}}>问卷统计</Button>
          </Space>
        </div>
        <div className={QuestionCardStyles.right}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => {nav(`/question/edit/${id}`)}}>{isStar ? '取消标星' : '标星'}</Button>
            <Popconfirm 
              title="再次确认"
              description="即将复制问卷"
              onConfirm={handleCopy}
              okText="Yes"
              cancelText="No"
              >
              <Button type="text" size="small" icon={<CopyOutlined />}>复制</Button>
            </Popconfirm>
            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={() => {confirmDelete()}}>删除</Button>
          </Space>
          
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;