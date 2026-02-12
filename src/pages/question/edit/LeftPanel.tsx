import React, {useState} from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentLib from './componentLib'

const LeftPanel: React.FC = () => {
  const tab = [
    {
      key: 'componentLib',
      label: '组件',
      children: <ComponentLib />,
      icon: <AppleOutlined />,
    },
    {
      key: 'layerLib',
      label: '图层',
      children: <div>图层</div>,
      icon: <AndroidOutlined />,
    },
  ]
  return (<Tabs defaultActiveKey="componentLib" items={tab}/>)
}

export default LeftPanel