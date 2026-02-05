import React, {useEffect} from 'react'
import { Button, Form, Input, Space,Checkbox, Typography } from 'antd';
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import {UserAddOutlined} from '@ant-design/icons'
import { USER_NAME_KEY, PASSWORD_KEY } from '../constant';

function rememberLogin({username, password, remember}:{username:string, password:string, remember:boolean}) {
  if (username && password && remember) {
    // 记住登录状态
    localStorage.setItem(USER_NAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
  } else {
    // 清除登录状态
    localStorage.removeItem(USER_NAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }
}

const Login:React.FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    rememberLogin({username:values.username, password:values.password, remember:values.remember})
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    const username = localStorage.getItem(USER_NAME_KEY)
    const password = localStorage.getItem(PASSWORD_KEY)
    if (username && password) {
      form.setFieldsValue({username, password, remember: true})
    }
  })
  return <>
    <div className={styles.container}>
      <Typography.Title level={2}><UserAddOutlined />用户登录</Typography.Title>
       <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item 
          label="用户名" 
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 6, max: 20, message: '用户名长度必须在 6 到 20 个字符之间' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
          ]}
          >
          <Input />
        </Form.Item>
        <Form.Item 
          label="密码" 
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            {min: 8, max: 15, message: '密码长度必须在 8 到 15 个字符之间'},
          ]}
          >
          <Input.Password />
        </Form.Item>
       <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button type="link" onClick={() => nav('/register')}>
              注册新用户
            </Button>
          </Space>
          
        </Form.Item>
      </Form>
    </div>
  </>
}

export default Login