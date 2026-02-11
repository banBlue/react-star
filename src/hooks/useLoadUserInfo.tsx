import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {loginReducer} from '../store/userReduxer'
import {useRequest} from 'ahooks'
import {getUserInfo} from '../services/user'
import useGetUserInfo from './useGetUserInfo'
const useLoadUserInfo = () => {
  const dispatch = useDispatch()
  const [waitReq, setWaitReq] = useState<boolean>(true)
  const {username} = useGetUserInfo()
  const {run} = useRequest(async() => {
    return await getUserInfo()
  }, {
    manual: true,
    onSuccess: (res) => {
      const {username, nickname} = res
      dispatch(loginReducer({username, nickname}))
    },
    onFinally: () => {
      setWaitReq(false)
    }
  })

  useEffect(() => {
    if(username) {
      setWaitReq(false)
    }else {
      run()
    }
  },[username])

  return {
    waitReq
  }
}
export default useLoadUserInfo