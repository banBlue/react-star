import { useSelector } from 'react-redux'
import type { UserStateType } from '../store/userReduxer'
import type {stateType} from '../store/index'

const useGetUserInfo = () => {
  const {username, nickname} = useSelector<stateType>(state => state.user) as UserStateType
  return {
    username,
    nickname
  }
}

export default useGetUserInfo