import React, { FC } from 'react'
import { Space, Button } from 'antd'
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'

const EditToolbar: FC = () => {
  const removeSelectedComponent = () => {}
  const addComponent = () => {}

  return (
    <div className={styles['toolbar-wrapper']}>
      <div className={styles.toolbar}>
        <Space>
          <Button type="link" icon={<UserAddOutlined />} onClick={() => addComponent()}>
            添加组件
          </Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => removeSelectedComponent()}>
            删除组件
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default EditToolbar