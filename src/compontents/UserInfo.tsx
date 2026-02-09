import React, { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import {UserOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../services/user'
import { useRequest } from 'ahooks'
import {removeUserToken} from '../utils/user'

const UserInfo:React.FC = () => {
  const nav = useNavigate()
  const {data} = useRequest(getUserInfo)
  const {username, nickname} = data || {}
  const logout = function () {
    message.success('退出成功')
    removeUserToken()
    nav('/login')
  }
  return <div>
    {!username ? 
     <Button type='primary' onClick={() => nav('/login')}>登录</Button> :  <span style={{color: '#e8e8e8'}}>
      <UserOutlined/>
      {nickname || username}
      <Button onClick={logout}  style={{marginLeft:'20px'}}>退出</Button>
    </span>}
  </div>
} 

export default UserInfo
