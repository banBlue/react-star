import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound:React.FC = () => {
  const nav = useNavigate()
  return <Result
    status="404"
    title="404"
    subTitle="没这个链接"
    extra={<Button type="primary" onClick={() => nav('/')}>Back Home</Button>}
  />
}

export default NotFound