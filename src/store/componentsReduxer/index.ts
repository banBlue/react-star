import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ComponentPropsType} from '../../compontents/QuestionCompontents'
import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  props: ComponentPropsType,
}

export type ComponentStateType = {
  componentsList: ComponentInfoType[],
  selectedId: string,
}

const initialState: ComponentStateType = {
  // 组件数据
  componentsList: [],
  // 其他数据
  selectedId: ''
}

const componentReducer = createSlice({
  name: 'components', // 空间名
  initialState, // 初始化数据
  reducers: {
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
    changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
      return {...state, selectedId: action.payload}
    },
    addComponent: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const {fe_id} = action.payload
      const index = state.componentsList.findIndex((item) => { return item.fe_id === state.selectedId})
      const componentsList = [...state.componentsList] // 不能直接修改原数组,使用浅拷贝的方式
      if(index !== -1) {
        componentsList.splice(index+1, 0 ,action.payload)
      }else {
        componentsList.push(action.payload)
      }
      return {...state, componentsList, selectedId: fe_id}
    },
    changeComponentProps: (state: ComponentStateType, action: PayloadAction<{fe_id:string, newProps: ComponentPropsType}>) => {
      const {fe_id, newProps} = action.payload
      const index = state.componentsList.findIndex((item) => { return item.fe_id === fe_id})
      if(index > -1) {
        const componentsList = [...state.componentsList] // 不能直接修改原数组,使用浅拷贝的方式
        const currentCom = componentsList[index]
        const newCom = {...currentCom, props: {...currentCom.props, ...newProps}}
        componentsList.splice(index, 1 ,newCom)
        return {...state, componentsList}
      }
      return state
    },
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const {selectedId, componentsList = []} = draft
      const index = componentsList.findIndex((item) => { return item.fe_id === selectedId})
      if(index > -1) {
        draft.componentsList.splice(index, 1)
        if(draft.componentsList.length > 0) {
          draft.selectedId = draft.componentsList[0].fe_id
        }else {
          draft.selectedId = ''
        }
      }
    })
  },
  
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps} = componentReducer.actions
export default componentReducer.reducer