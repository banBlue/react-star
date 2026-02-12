export type QuestionTitleProps = {
  title?: string,
  level: 1 | 2 | 3| 4 | 5
  isCenter?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitleProps = {
  title: '在下一行标题',
  level: 1,
  isCenter: false
}