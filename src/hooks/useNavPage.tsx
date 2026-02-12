
import {useEffect} from 'react'
import useGetUserInfo from './useGetUserInfo'
import {useLocation, useNavigate} from 'react-router-dom'
import {isNoNeedUserInfo, isLoginOrRegister} from '../router/index'
const useNavPage = (awaitData: boolean) => {
  const {username} = useGetUserInfo()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(awaitData) {
      return
    }
    // 已经登录了
    if(username) {
      // 判断是否待在了不该待的地方 /login /regeiter 
      if(isLoginOrRegister(pathname)) {
        // 待在不该待的地方，跳转到首页
        navigate('/')
      }
      return
    }
    // 未登录
    // 判断是否待在了不该待的地方 /login /regeiter 
    if(!isNoNeedUserInfo(pathname)) {
      // 待在不该待的地方，跳转到登录页
      navigate('/login')
    }
  }, [awaitData])
}
export default useNavPage