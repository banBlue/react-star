import React, {useState, useEffect} from 'react'
import useLoadQuestion from '../../../hooks/useLoadQuestion'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import {changeSelectedId} from '../../../store/componentsReduxer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const Edit:React.FC = () => {
  const { loading} = useLoadQuestion()
  const dispatch = useDispatch()
  const setSelectedId = (id:string) => {
    dispatch(changeSelectedId(id))
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={() => {setSelectedId('')}}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div> 
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit