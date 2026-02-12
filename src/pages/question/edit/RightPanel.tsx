import React, {useState} from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProp from './ComponentProp'



const LeftPanel: React.FC = () => {
  const tab = [
    {
      key: 'prop',
      label: '属性',
      children: <ComponentProp />,
      icon: <AppleOutlined />,
    },
    {
      key: 'pageSetting',
      label: '页面设置',
      children: <div>页面设置</div>,
      icon: <AndroidOutlined />,
    },
  ]
  return (<Tabs defaultActiveKey="componentLib" items={tab}/>)
}

export default LeftPanel