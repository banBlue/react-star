import React from 'react'
import QuestionTitle from '../../../compontents/QuestionCompontents/QuestionTitle/Component'
import QuestionInput from '../../../compontents/QuestionCompontents/QuestionInput/Component'
import styles from './EditCanvas.module.scss'
import {Spin} from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {getComponentConfType} from '../../../compontents/QuestionCompontents'
import type {ComponentInfoType} from '../../../store/componentsReduxer'

type PropsType = {
  loading: boolean
}

function getComponentByType(item: ComponentInfoType) {
  const {props, type} = item
  const Component = getComponentConfType(type)?.Component
  if(!Component) {
    return null
  }
  return (
    <Component {...props} />
  )
}

const EditCanvas: React.FC<PropsType> = (props: PropsType) => {
  const {loading} = props
  const {componentsList = []} = useGetComponentInfo()
  if(loading) {
    return (
      <Spin />
    )
  }
  return (
    <div className={styles.canvas}>
      {componentsList.map(item => (
        <div className={styles['component-wrapper']} key={item['fe_id']}>
          <div className={styles['component']}>
            {/* <item.Component {...item.defaultProps} /> */}
            {getComponentByType(item)}
          </div>
        </div>
      ))}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles['component']}>
          <QuestionInput placeholder='请输入' />
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas