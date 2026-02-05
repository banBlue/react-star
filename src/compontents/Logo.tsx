import React from 'react'
import {Link} from 'react-router-dom'
import { Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import style from './Logo.module.scss'

const { Title } = Typography;

const Logo:React.FC = () => {
  return<Link to='/'>
  <Space className={style.logo}>
    <FileSearchOutlined className={style.icon} />  
    <Title level={4} className={style.title}>M问卷网</Title>
  </Space>
  </Link>
}

export default Logo
