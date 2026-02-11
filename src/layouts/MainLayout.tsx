import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout, Spin } from 'antd';
import Logo from '../compontents/Logo';
import UserInfo from '../compontents/UserInfo';
import useLoadUserInfo from '../hooks/useLoadUserInfo'
const { Header, Footer, Content } = Layout;

const MainLayout:React.FC = () => {
  const {waitReq} = useLoadUserInfo()
  return <Layout>
    <Header className={styles.header}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        <UserInfo />
      </div>
    </Header>
    <Content className={styles.main}>
      {waitReq ? <div style={{textAlign: 'center'}}><Spin style={{ marginTop: '300px'}} /></div> : <Outlet />}      
    </Content>
    <Footer className={styles.footer}>footer页脚 @2026年咯</Footer>
  </Layout>
}

export default MainLayout