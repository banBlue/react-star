import React from 'react'
import {Typography} from 'antd'
import {QuestionTitleProps, QuestionTitleDefaultProps} from './interface'
const {Title} = Typography
const QuestionTitle: React.FC<QuestionTitleProps> = (props:QuestionTitleProps) => {
  const {text, level = 1, isCenter} = {...QuestionTitleDefaultProps, ...props}
  const genFontSize = (level: number) => {
    switch(level) {
      case 1:
        return '24px'
      case 2:
        return '20px'
      case 3:
        return '16px'
      case 4:
        return '14px'
      case 5:
        return '12px'
      default:
        return '24px'
    }
  }
  return (
    <Title level={level} style={{textAlign: isCenter ? 'center' : 'start', marginBottom: '0', fontSize: genFontSize(level)}}>
      {text}
    </Title>
  )
}

export default QuestionTitle
