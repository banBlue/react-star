import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ComponentPropsType} from '../../compontents/QuestionCompontents'
import { produce } from 'immer'
import { getNextSelectedId, insertNewComponent } from './utils'
import { TrophyOutlined } from '@ant-design/icons'

export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  props: ComponentPropsType,
  isHidden: boolean,
}

export type ComponentsStateType = {
  componentList: ComponentInfoType[],
  selectedId: string,
}

const initialState: ComponentsStateType = {
  // 组件数据
  componentList: [],
  // 其他数据
  selectedId: ''
}

const componentReducer = createSlice({
  name: 'components', // 空间名
  initialState, // 初始化数据
  reducers: {
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      return {...state, selectedId: action.payload}
    },
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const {fe_id} = action.payload
      const index = state.componentList.findIndex((item) => { return item.fe_id === state.selectedId})
      const componentList = [...state.componentList] // 不能直接修改原数组,使用浅拷贝的方式
      if(index !== -1) {
        componentList.splice(index+1, 0 ,action.payload)
      }else {
        componentList.push(action.payload)
      }
      return {...state, componentList, selectedId: fe_id}
    },
    changeComponentProps: (state: ComponentsStateType, action: PayloadAction<{fe_id:string, newProps: ComponentPropsType}>) => {
      const {fe_id, newProps} = action.payload
      const index = state.componentList.findIndex((item) => { return item.fe_id === fe_id})
      if(index > -1) {
        const componentList = [...state.componentList] // 不能直接修改原数组,使用浅拷贝的方式
        const currentCom = componentList[index]
        const newCom = {...currentCom, props: {...currentCom.props, ...newProps}}
        componentList.splice(index, 1 ,newCom)
        return {...state, componentList}
      }
      return state
    },
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const {selectedId, componentList = []} = draft
      const index = componentList.findIndex((item) => { return item.fe_id === selectedId})
      if(index > -1) {
        draft.componentList.splice(index, 1)
        if(draft.componentList.length > 0) {
          draft.selectedId = draft.componentList[0].fe_id
        }else {
          draft.selectedId = ''
        }
      }
    }),
    changeComponentHidden: produce((draft: ComponentsStateType) => {
      const {selectedId} = draft      
      draft.componentList.some(item => {
        if(item.fe_id === selectedId) {
          draft.selectedId = getNextSelectedId(selectedId, draft.componentList)
          item.isHidden = !item.isHidden          
          return true
        }
      })
    })
  },  
})

export const { changeComponentHidden, resetComponents, changeSelectedId, addComponent, changeComponentProps, removeSelectedComponent} = componentReducer.actions
export default componentReducer.reducer