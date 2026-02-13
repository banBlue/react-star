import React, {useEffect} from 'react'
import { Form, Checkbox, Input, Space, Button } from 'antd'
import type { CheckboxOptionType, GetProp,Row, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { QuestionCheckboxProps, QuestionCheckboxItemProps } from './interface'
import { nanoid } from 'nanoid';

const QuestionCheckboxPropComponent: React.FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
  const { text, isVertical, list = [], disabled = false, onChange } = props
  
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      text,
      isVertical,
      list
    })
  }, [text, isVertical, list])

  function handleChange() {
    if(onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckboxProps
      const list = form.getFieldValue('list')
      newValues.list = list
      onChange(newValues)
    }
  }

  return (
    <>
      <Form form={form} disabled={disabled} layout="vertical" onValuesChange={() => { handleChange()}} initialValues={{
      text,
      isVertical
    }}>
      <Form.Item name="text" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {
            (fields, {add, remove}) => {
              return <>
                {fields.map(({key, name}, index) => {                 
                  return (
                    <Space key={key} align="baseline">
                      {/* 当前选项是否选中 */}
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox />
                      </Form.Item>
                      <Form.Item name={[name, 'text']} rules={[{ required: true, message: '请输入选项文字' }, {
                        validator: (_, text) => {
                          const list = form.getFieldValue('list')
                          let num = 0
                          list.forEach((item:QuestionCheckboxItemProps) => {
                            if(item.text === text) {
                              num++
                            } 
                          })
                          if(num > 1) {
                            return Promise.reject('选项文字不能重复')
                          }
                          return Promise.resolve()
                        }
                      }]}>
                        <Input placeholder="请输入选项文字" />
                      </Form.Item>
                      {/* 删除当前选项 */}
                      {index > 0 && <Button onClick={() => remove(index)}>删除</Button>}
                    </Space>
                  )
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ text: '', value: nanoid(5), checked: false })}
                    icon={<PlusOutlined />}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            }
          }
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" label="竖着走" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
    </>
  )
}

export default QuestionCheckboxPropComponent