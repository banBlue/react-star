import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import { Spin } from 'antd';

const QuestionLayout:React.FC = () => {
  const {waitReq} = useLoadUserInfo()
  return <>
    <p>quesiont layout</p>
    <div>
      {waitReq ? <div style={{textAlign: 'center'}}><Spin style={{ marginTop: '300px'}} /></div> : <Outlet />}    
    </div>
  </>
}

export default QuestionLayout