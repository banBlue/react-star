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

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]

export const getComponentConfType = (type:string) => {
  return componentConfList.find(item => item.type === type)
}