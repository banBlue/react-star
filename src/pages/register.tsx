import React from 'react'
import { Button, Form, Input, Space, message } from 'antd';
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import {UserAddOutlined} from '@ant-design/icons'
import {useRequest} from 'ahooks'
import {registerService} from '../services/user'

const Register:React.FC = () => {
  const nav = useNavigate()
  const onFinish = (values: any) => {
    console.log(values);
    const {username,password,nickname = ''} = values
    run({
      username,
      password,
      nickname,
    })
  };
  const {run , loading} = useRequest(async (params) => {
    return await registerService(params)
  }, {
    manual: true,
    onSuccess: () => {
      message.success('注册成功')
      nav('/login')
    }
  })
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return <>
    <div className={styles.container}>
      <p className={styles.title}><UserAddOutlined />注册新用户</p>
       <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
        <Form.Item 
          label="确认密码" 
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(rule: any, value: any, callback: any) {
                if (value && value !== getFieldValue('password')) {
                  callback('两次输入密码不一致');
                } else {
                  callback();
                }
              },
            }),
          ]}
          >
          <Input.Password />
        </Form.Item>
        <Form.Item 
          label="昵称" 
          name="nickname"
          rules={[
            { required: false, message: '请输入昵称' },
            { min: 2, max: 10, message: '昵称长度必须在 2 到 10 个字符之间' },
          ]}
          >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Button type="link" onClick={() => nav('/login')} disabled={loading}>
              已有账户,登录
            </Button>
          </Space>
          
        </Form.Item>
      </Form>
    </div>
  </>
}

export default Register