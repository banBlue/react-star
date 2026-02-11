import React, {useState, useEffect} from 'react'
import useLoadQuestion from '../../../hooks/useLoadQuestion'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit:React.FC = () => {
  const { loading} = useLoadQuestion()
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div> 
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit