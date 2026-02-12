import React from 'react'
import styles from './EditCanvas.module.scss'
import {Spin} from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {getComponentConfType} from '../../../compontents/QuestionCompontents'
import type {ComponentInfoType} from '../../../store/componentsReduxer'
import { useDispatch } from 'react-redux'
import {changeSelectedId} from '../../../store/componentsReduxer'

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
  const {componentsList = [], selectedId = ''} = useGetComponentInfo()
  const dispatch = useDispatch()
  const setSelectedId = (e:React.MouseEvent,id:string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  if(loading) {
    return (
      <Spin />
    )
  }
  return (
    <div className={styles.canvas}>
      {componentsList.map(item => {
        const isSelected = item['fe_id'] === selectedId
        return (
        <div className={styles['component-wrapper'] + (isSelected ? ' ' + styles['selected'] : '')} key={item['fe_id']} onClick={(e) => {setSelectedId(e,item['fe_id'])}}>
          <div className={styles['component']}>
            {/* <item.Component {...item.defaultProps} /> */}
            {getComponentByType(item)}
          </div>
        </div>
      )
      })}
    </div>
  )
}

export default EditCanvas