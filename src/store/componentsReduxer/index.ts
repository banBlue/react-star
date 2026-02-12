import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ComponentPropsType} from '../../compontents/QuestionCompontents'

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
    // state.selectedId = action.payload
      state.selectedId = action.payload
    }
  },
  
})

export const { resetComponents, changeSelectedId} = componentReducer.actions
export default componentReducer.reducer