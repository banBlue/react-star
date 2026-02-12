import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: '标题',  // 组件名
  type: 'questionTitle', // 和后端对齐
  Component: Component, // 中间组件实例
  PropComponent: PropComponent, //右侧表单组件实例
  defaultProps: QuestionTitleDefaultProps,
}