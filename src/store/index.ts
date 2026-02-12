import {configureStore} from '@reduxjs/toolkit'
import userReduxer from './userReduxer'
import type {UserStateType} from './userReduxer'
import componentsReduxer from './componentsReduxer/index'
import type {ComponentStateType} from './componentsReduxer/index'

export type stateType = {
  user: UserStateType,
  components: ComponentStateType
}

export default configureStore({
  reducer: {
    //分模块管理
    user: userReduxer,
    components: componentsReduxer,
  }
})