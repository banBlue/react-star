import {configureStore} from '@reduxjs/toolkit'
import userReduxer from './userReduxer'
import type {UserStateType} from './userReduxer'

export type stateType = {
  user: UserStateType
}

export default configureStore({
  reducer: {
    //分模块管理
    user: userReduxer
  }
})