import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { UserAddOutlined, EyeInvisibleOutlined,DownloadOutlined,DeleteOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden } from '../../../store/componentsReduxer'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const toogleShowStatus= () => {
    dispatch(changeComponentHidden())
  }
  return (
    <div className={styles['toolbar-wrapper']}>
      <div className={styles.toolbar}>
        <Space>
          <Tooltip title="删除选中组件">
            <Button shape="circle"  icon={<DeleteOutlined />} onClick={() => dispatch(removeSelectedComponent())}/>                      
          </Tooltip>
          <Tooltip title="隐藏/显示选中组件">
            <Button shape="circle"  icon={<EyeInvisibleOutlined />} onClick={() => toogleShowStatus()}/>                      
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}

export default EditToolbar