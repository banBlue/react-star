import { useSelector } from 'react-redux'
import type { ComponentStateType } from '../store/componentsReduxer/index'
import type {stateType} from '../store/index'

const useGetComponentInfo = () => {
  const { componentsList = [], selectedId = ''} = useSelector<stateType>(state => state.components) as ComponentStateType
  const selectedComponent = componentsList.find(item => item['fe_id'] === selectedId) || null
  return {
    componentsList,
    selectedId,
    selectedComponent
  }
}

export default useGetComponentInfo
