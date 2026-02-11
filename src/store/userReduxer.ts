import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export type UserStateType = {
  nickname: string
  username: string
}

const initialState: UserStateType = {
  nickname: '',
  username: ''
}

const userReduxer = createSlice({
  name: 'user', // 模块名
  initialState: initialState,
  reducers: {
    loginReducer: (state:UserStateType, action: PayloadAction<UserStateType>) => {
      state.nickname = action.payload.nickname
      state.username = action.payload.username
    },
    logoutReducer: (state: UserStateType) => {
      state.nickname = ''
      state.username = ''
    }
  }
})

export const {loginReducer, logoutReducer} = userReduxer.actions

export default userReduxer.reducer