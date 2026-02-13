import { useSelector } from 'react-redux'
import type { ComponentsStateType } from '../store/componentsReduxer/index'
import type {stateType} from '../store/index'

const useGetComponentInfo = () => {
  const { componentList = [], selectedId = '', copiedComponent = null} = useSelector<stateType>(state => state.components) as ComponentsStateType
  const selectedComponent = componentList.find(item => item['fe_id'] === selectedId) || null
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent
  }
}

export default useGetComponentInfo
