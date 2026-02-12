import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserInfo from '../hooks/useLoadUserInfo'
import useNavPage from '../hooks/useNavPage'
import { Spin } from 'antd';

const QuestionLayout:React.FC = () => {
  const {waitReq} = useLoadUserInfo()
  useNavPage(waitReq)
  return <>
    <div>
      {waitReq ? <div style={{textAlign: 'center'}}><Spin style={{ marginTop: '300px'}} /></div> : <Outlet />}    
    </div>
  </>
}

export default QuestionLayout