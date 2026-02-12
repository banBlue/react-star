import { useSelector } from 'react-redux'
import type { ComponentStateType } from '../store/componentsReduxer/index'
import type {stateType} from '../store/index'

const useGetComponentInfo = () => {
  const { componentsList = [], selectedId = ''} = useSelector<stateType>(state => state.components) as ComponentStateType
  return {
    componentsList,
    selectedId
  }
}

export default useGetComponentInfo
