import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent,copySelectedComponent,pasteComponent,uparrowSelectComponent,arrowDownSelectComponent } from '../store/componentsReduxer'

function isActiveComponent() {
  return document.activeElement === document.body
}

export const useComponentKeyPress = () => {
  const dispatch = useDispatch()
  useKeyPress('backspace', () => {
    if(!isActiveComponent()) return
    dispatch(removeSelectedComponent())
  });
  useKeyPress('ctrl.c', () => {
    if(!isActiveComponent()) return
    dispatch(copySelectedComponent())
  });
  useKeyPress('ctrl.v', () => {
    if(!isActiveComponent()) return
    dispatch(pasteComponent())
  });
  useKeyPress('uparrow', () => {
    if(!isActiveComponent()) return
    dispatch(uparrowSelectComponent())
  })
  useKeyPress(40, () => {
    if(!isActiveComponent()) return
    dispatch(arrowDownSelectComponent())
  })
}