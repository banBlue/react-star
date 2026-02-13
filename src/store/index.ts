import {configureStore} from '@reduxjs/toolkit'
import userReduxer from './userReduxer'
import type {UserStateType} from './userReduxer'
import componentsReduxer from './componentsReduxer/index'
import type {ComponentsStateType} from './componentsReduxer/index'

export type stateType = {
  user: UserStateType,
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    //分模块管理
    user: userReduxer,
    components: componentsReduxer,
  }
})