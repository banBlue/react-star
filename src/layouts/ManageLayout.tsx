import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './ManageLayout.module.scss'
import { Button, Divider, Space } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlusOutlined, DeleteOutlined, FrownOutlined, StarOutlined } from '@ant-design/icons'

const ManageLayout:React.FC = () => {
  const {pathname} = useLocation()
  const nav = useNavigate()

  return <div className={style.container}>
    <div className={style.left}>
      <p>manage layout</p>
      <Space vertical={true}>
        <Button type='primary' icon={<PlusOutlined />}>新增问卷</Button>
        <Divider type="vertical" />
        <Button type={pathname.includes('/manage/list') ? 'default' : 'text'} onClick={() => nav('/manage/list')} icon={<FrownOutlined />}>查看问卷</Button>
        <Button type={pathname.includes('/manage/star') ? 'default' : 'text'} onClick={() => nav('/manage/star')} icon={<StarOutlined />}>星标问卷</Button>
        <Button type={pathname.includes('/manage/trash') ? 'default' : 'text'} onClick={() => nav('/manage/trash')} icon={<DeleteOutlined />} >回收站</Button>
      </Space>      
    </div>
    <div className={style.right}>
      <Outlet />
    </div>
  </div>
}

export default ManageLayout