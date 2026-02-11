import React from 'react'
import { Button, message } from 'antd'
import {UserOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {removeUserToken} from '../utils/user'
import useGetUserInfo from '../hooks/useGetUserInfo'
import {useDispatch} from 'react-redux'
import {logoutReducer} from '../store/userReduxer'

const UserInfo:React.FC = () => {
  const nav = useNavigate()
  const {username, nickname} = useGetUserInfo()
  const dispatch = useDispatch()
  const logout = function () {
    dispatch(logoutReducer())
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
