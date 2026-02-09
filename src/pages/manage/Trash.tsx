import React, {useState} from 'react';
import { Typography, Empty, Table,Tag, Button,Space, Modal, message,  } from 'antd';
import ListSearch from '../../compontents/ListSearch';
import ListStyles from './common.module.scss';
import {DeleteOutlined} from '@ant-design/icons'
import {useRequest} from 'ahooks'
import {updateQuestionService,deleteQuestionService} from '../../services/question'

import {QuestionType} from '../../type/index'
import useQuestionList from '../../hooks/useQuestionList'
import ListPage from '../../compontents/ListPage'

const { Title } = Typography;

const Trash: React.FC = () => {
  const {list, total, loading, refresh} = useQuestionList({isDeleted : true})
  
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
      dataIndex: 'createdAt',
    },
  ]
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {run:handleRecover} = useRequest(async () => {
    for await(const id of selectedRowKeys) {
      await updateQuestionService(String(id), {isDeleted: false})
    }
  }, {
    manual: true,
    debounceWait: 1000,
    onSuccess: () => {
      message.success('恢复成功')
      refresh()
      setSelectedRowKeys([])
    }
  })

  const {run:_deleteQuestionService} = useRequest(async () => {
    return await deleteQuestionService({ids: selectedRowKeys as string[]})
  }, {
    manual: true,
    debounceWait: 1000,
    onSuccess: () => {
      message.success('删除成功')
      refresh()
      setSelectedRowKeys([])
    }
  })
  const handleDelete = () => {    
    Modal.confirm({
      title: '确认删除吗,永久无法找回？',
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
  const TableFragment = (
    <>
      <Space style={{marginBottom: 16}}>
        <Button type='primary' onClick={handleRecover} disabled={selectedRowKeys.length === 0}>恢复</Button>
        <Button type='primary' danger onClick={handleDelete} disabled={selectedRowKeys.length === 0}>删除</Button>
      </Space>
      <Table 
        columns={tableColumns} 
        dataSource={list}
        pagination={false} 
        rowKey={(record:QuestionType) => record.id} 
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: React.Key[]) => {
            console.log('newSelectedRowKeys', newSelectedRowKeys);
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
          list.length === 0 ? <Empty /> : TableFragment
        }
      </div>

      <div className={ListStyles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
