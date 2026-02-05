import React, {useState} from 'react';
import { Typography, Empty, Table,Tag, Button,Space, Modal, message,  } from 'antd';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {DeleteOutlined} from '@ant-design/icons'
const { Title } = Typography;

// 问题数据
const rawQuestionList = [
  {
    id: 1,
    title: '问题1',
    content: '问题1的内容',
    isPublished: false,
    isStar:false,
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

const Trash: React.FC = () => {
  const [qList, setQList] = useState(rawQuestionList);
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发布状态',
      dataIndex: 'isPublished',
      render(isPublished:boolean) {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="gold">未发布</Tag>
      }
    },
    {
      title: '回答数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ]
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const handleRecover = () => {
    message.success('恢复成功')
  }
  const handleDelete = () => {    
    Modal.confirm({
      title: '确认删除吗,永久无法找回？',
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
  const TableFragment = (
    <>
      <Space style={{marginBottom: 16}}>
        <Button type='primary' onClick={handleRecover} disabled={selectedRowKeys.length === 0}>恢复</Button>
        <Button type='primary' danger onClick={handleDelete} disabled={selectedRowKeys.length === 0}>删除</Button>
      </Space>
      <Table 
        columns={tableColumns} 
        dataSource={rawQuestionList}
        pagination={false} 
        rowKey={(record) => record.id} 
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
          },
        }}
        />
    </>
  )
  return (
    <>
      <div className={ListStyles.title}>
        <div className={ListStyles.left}>
          <Title level={2}><DeleteOutlined /> 垃圾站</Title>
        </div>
        <div className={ListStyles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={ListStyles.content}>
        {
          qList.length === 0 ? <Empty /> : TableFragment
        }
      </div>

      <div className={ListStyles.footer}>当我是个页脚咯</div>
    </>
  );
};

export default Trash;
