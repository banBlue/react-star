import React from 'react'
import styles from './EditCanvas.module.scss'
import {Spin} from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {getComponentConfType} from '../../../compontents/QuestionCompontents'
import type {ComponentInfoType} from '../../../store/componentsReduxer'
import { useDispatch } from 'react-redux'
import {changeSelectedId} from '../../../store/componentsReduxer'
import classNames from 'classnames'

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
  const {componentList = [], selectedId = ''} = useGetComponentInfo()
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
      {componentList.filter(item => !item.isHidden).map(item => {
        const isSelected = item['fe_id'] === selectedId
        const className = classNames(styles['component-wrapper'], {
          [styles['selected']]: isSelected,
          [styles['locked']]: item.isLocked,
        })
        return (
        <div className={className} key={item['fe_id']} onClick={(e) => {setSelectedId(e,item['fe_id'])}}>
          <div className={styles['component']}>
            {getComponentByType(item)}
          </div>
        </div>
      )
      })}
    </div>
  )
}

export default EditCanvas