import React from 'react'
import { componentConfGroup } from '../../../compontents/QuestionCompontents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { ComponentConfType } from '../../../compontents/QuestionCompontents'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReduxer'
import { nanoid } from 'nanoid'
const { Title } = Typography



const ComponentLib: React.FC = () => {
  const dispatch = useDispatch()
  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c    
    const handleClick = () => {
        dispatch(
          addComponent({
            fe_id: nanoid(), // 前端生成的 id
            title,
            type,
            props: defaultProps,
            isHidden: false,
            isLocked: false,
          })
        )
      }
    return (
      <div key={type}  className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component {...defaultProps} />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib