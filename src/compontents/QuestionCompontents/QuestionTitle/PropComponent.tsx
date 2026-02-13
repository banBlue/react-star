import React,{useEffect} from 'react'
import type {QuestionTitleProps} from './index'
import {Form, Select, Checkbox, Input} from 'antd'

const PropComponent: React.FC<QuestionTitleProps> =  (props:QuestionTitleProps) => {
  const {text, level, isCenter, onChange, disabled} = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter
    })
  }, [text, level, isCenter])
  return (
    <Form form={form} disabled={disabled} layout="vertical" onValuesChange={() => { onChange && onChange(form.getFieldsValue())}} initialValues={{
      text,
      level,
      isCenter
    }}>
      <Form.Item name="text" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="level" label="等级">
        <Select options={[{
          label: '一级',
          value: 1
        },{
          label: '二级',
          value: 2
        },{
          label: '三级',
          value: 3
        },{
          label: '四级',
          value: 4
        },{
          label: '五级',
          value: 5
        }]} />
      </Form.Item>
      <Form.Item name="isCenter" label="是否居中显示" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}

export default PropComponent