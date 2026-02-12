// @ts-nocheck
import React from 'react'
import QuestionTitleConf, {QuestionTitleProps} from './QuestionTitle'
import QuestionInputConf,{QuestionInputPropsType} from './QuestionInput'

// 组件的 propType 类型
export type ComponentPropsType = QuestionTitleProps & QuestionInputPropsType  

export type ComponentConfType = {
  title: string,
  type: string,
  Component: React.FC<ComponentPropsType>,
  defaultProps: ComponentPropsType
}

// // 组件配置列表
let componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

export const getComponentConfType = (type:string) => {
  return componentConfList.find(item => item.type === type)
}