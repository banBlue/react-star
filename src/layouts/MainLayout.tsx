import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout } from 'antd';
import Logo from '../compontents/Logo';
import UserInfo from '../compontents/UserInfo';
const { Header, Footer, Content } = Layout;

const MainLayout:React.FC = () => {
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
      <Outlet />
    </Content>
    <Footer className={styles.footer}>footer页脚 @2026年咯</Footer>
  </Layout>
}

export default MainLayout