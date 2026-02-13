import QuestionCheckBox from './Component'
import QuestionCheckboxPropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'
export * from './interface'

export default {
  title: '多选标题项',
  type: 'QuestionCheckbox',
  Component: QuestionCheckBox,
  PropComponent: QuestionCheckboxPropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
