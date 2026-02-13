export type QuestionCheckboxItemProps = {
  text: string
  value: string
  checked: boolean
}

export type QuestionCheckboxProps = {
  text: string
  isVertical?: boolean
  list?: QuestionCheckboxItemProps[]
  disabled?: boolean
  onChange?: (newProps: QuestionCheckboxProps) => void
}

export const QuestionCheckboxDefaultProps = {
  text: '多选标题项',
  isVertical: false,
  list: [{
    text: '选项1',
    value: '1',
    checked: false,
  },
  {
    text: '选项2',
    value: '2',
    checked: false,
  }
  ]
}

