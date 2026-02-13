import React, {useState} from 'react'
import { Typography, Checkbox, Space } from 'antd'
import type { CheckboxOptionType, GetProp,  } from 'antd';
import { QuestionCheckboxProps, QuestionCheckboxDefaultProps } from './interface'
const { Title } = Typography

const QuestionCheckBox: React.FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
  const { text, isVertical, list = [] } = {...QuestionCheckboxDefaultProps, ...props}

  return (
    <>
      <Title level={5} style={{ marginBottom: '0'}}>
        {text}
      </Title>
      <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(item => (
          <Checkbox key={item.value} value={item.value} checked={item.checked}>{item.text}</Checkbox>
        ))}
      </Space>
    </>
  )
}

export default QuestionCheckBox