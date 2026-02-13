import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { UserAddOutlined, EyeInvisibleOutlined,DownloadOutlined,DeleteOutlined,LockOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden, changeComponentLocked } from '../../../store/componentsReduxer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const {selectedComponent} = useGetComponentInfo()
  if(selectedComponent === null) return <div>未找到属性组件</div>
  const {isLocked} = selectedComponent || {}  
  const toogleShowStatus= () => {
    dispatch(changeComponentHidden())
  }
  const toogleLockedStatus= () => {
    dispatch(changeComponentLocked())
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
          <Tooltip title="锁定组件">
            <Button shape="circle" type={isLocked ? 'primary' : 'default'}  icon={<LockOutlined />} onClick={() => toogleLockedStatus()}/>                      
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}

export default EditToolbar