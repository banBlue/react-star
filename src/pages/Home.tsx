import React from 'react'
import { Button } from 'antd';
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';

const Home:React.FC = () => {
  const nav = useNavigate()
  return <>
    <div className={styles.container}>
      <p className={styles.title}>问卷调查 | 在线投票</p>
      <p className={styles.subTitle}>已累计创建问卷100份, 发布问卷90份, 收到答案20份</p>
      <Button type="primary" onClick={() => nav('/manage/list')}>开始使用</Button>
    </div>
  </>
}

export default Home