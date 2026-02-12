import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: '标题',  // 组件名
  type: 'questionTitle', // 和后端对齐
  Component: Component, // 组件实例
  defaultProps: QuestionTitleDefaultProps,
}