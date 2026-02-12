import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {getComponentConfType} from '../../../compontents/QuestionCompontents'
import type {QuestionTitleProps} from '../../../compontents/QuestionCompontents/QuestionTitle'
import {useDispatch} from 'react-redux'
import {changeComponentProps} from '../../../store/componentsReduxer'

const ComponentProp: React.FC = () => {
  const {selectedComponent} = useGetComponentInfo()
  const dispatch = useDispatch()
  if(selectedComponent === null) return <div>未找到属性组件</div>
  const {type ,props, fe_id} = selectedComponent
  const componentConf = getComponentConfType(type) || null
  if(componentConf === null) return <div>未找到属性组件</div>
  const onChange = (newProps:QuestionTitleProps) => {
    console.log(newProps)
    dispatch(changeComponentProps({fe_id, newProps}))
  }
  return (
    <componentConf.PropComponent {...props} onChange={onChange} />
  )
}

export default ComponentProp
