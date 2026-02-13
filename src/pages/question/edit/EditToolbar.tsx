import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { UserAddOutlined, EyeInvisibleOutlined,DownloadOutlined,DeleteOutlined,LockOutlined,CopyOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden, changeComponentLocked,copySelectedComponent,pasteComponent } from '../../../store/componentsReduxer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useComponentKeyPress } from '../../../hooks/useComponentKeyPress'

const EditToolbar: FC = () => {
    useComponentKeyPress()
  const dispatch = useDispatch()
  const {selectedComponent, copiedComponent} = useGetComponentInfo()
  if(selectedComponent === null) return <div>未找到属性组件</div>

  const {isLocked} = selectedComponent || {}  
  const toogleShowStatus= () => {
    dispatch(changeComponentHidden())
  }
  const toogleLockedStatus= () => {
    dispatch(changeComponentLocked())
  }
  const handleCopyComponent = () => {
    dispatch(copySelectedComponent())
  }
  const handlePasteComponent = () => {
    dispatch(pasteComponent())
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
          <Tooltip title="复制组件">
            <Button shape="circle"  icon={<CopyOutlined />} onClick={() => handleCopyComponent()}/>                      
          </Tooltip>
          <Tooltip title="粘黏">
            <Button shape="circle" disabled={copiedComponent === null}  icon={<DownloadOutlined />} onClick={() => handlePasteComponent()}/>
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}

export default EditToolbar