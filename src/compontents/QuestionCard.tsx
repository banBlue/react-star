import React, {useState} from 'react';
import QuestionCardStyles from './QuestionCard.module.scss';
import classNames from 'classnames';
import { useNavigate, Link } from 'react-router-dom';
import { Tag, Space, Button, Divider, Modal, message, Popconfirm   } from 'antd' 
import {EditOutlined , LineChartOutlined,DeleteOutlined,CopyOutlined,StarOutlined , BookOutlined} from '@ant-design/icons'
import { QuestionType } from '../type';
import { updateQuestionService, duplicateQuestionService } from '../services/question';
import {useRequest} from 'ahooks'

const QuestionCard:React.FC<QuestionType> = (props:QuestionType) => {
  const nav = useNavigate()
  const {_id, title, isPublished, isStar, answerCount, createdAt} = props;
  const [isStarState, setIsStarState] = useState<boolean>(isStar)
  const classCard = classNames(QuestionCardStyles.card, {
    [QuestionCardStyles['is-published']]: isPublished,
    [QuestionCardStyles['is-star']]: isStarState,
  })

  const {run: _updateQuestionService, loading} = useRequest(async () => {
    const data = await updateQuestionService(_id, {isStar: !isStarState })
    return data
  }, {
    manual: true,
    onSuccess: (res) => {
      message.success('操作成功')
      setIsStarState(!isStarState)
    }
  })

  const {run: handleCopy, loading: loadingCopy} = useRequest(async () => {
    const data = await duplicateQuestionService(_id)
    return data
  }, {
    manual: true,
    onSuccess: (res) => {
      message.success({
        content: '复制成功',
        onClose: ()=> {
          nav(`/question/edit/${res._id}`)
        }
      })
    }
  })

  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const {run: _deleteQuestionService, loading: loadingDelete} = useRequest(async () => {
    const data = await updateQuestionService(_id, {isDeleted: true })
    return data
  }, {
    manual: true,
    onSuccess: (res) => {
      message.success('操作成功')
      setIsDeleted(true)
    }
  })

  const confirmDelete = () => {
    Modal.confirm({
      title: '确认删除吗？',
      okText: '确认',
      okType: 'danger',
      onOk: () => {
        _deleteQuestionService()
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  // 已经被删除了,没必要渲染卡片
  if(isDeleted) return null

  return (
    <div className={classCard}>
      <div className={QuestionCardStyles.title}>  
        <div className={QuestionCardStyles.divt}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            {isStarState ? <StarOutlined /> :  <BookOutlined /> }{title}
          </Link>
        </div>
        <div className={QuestionCardStyles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="gold">未发布</Tag>}
            <span>答案: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={QuestionCardStyles.info}>
        <div className={QuestionCardStyles.left}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => {nav(`/question/edit/${_id}`)}}>编辑问卷</Button>
            <Button type="text" size="small" icon={<LineChartOutlined />} onClick={() => {nav(`/question/stat/${_id}`)}}>问卷统计</Button>
          </Space>
        </div>
        <div className={QuestionCardStyles.right}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />} onClick={_updateQuestionService} disabled={loading}>{isStarState ? '取消标星' : '标星'}</Button>
            <Popconfirm 
              title="再次确认"
              description="即将复制问卷"
              onConfirm={handleCopy}
              okText="Yes"
              cancelText="No"
              >
              <Button type="text" size="small" icon={<CopyOutlined />} loading={loadingCopy}>复制</Button>
            </Popconfirm>
            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={() => {confirmDelete()}} disabled={loadingDelete}>删除</Button>
          </Space>
          
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;