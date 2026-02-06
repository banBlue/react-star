import React from 'react'
import useLoadQuestion from '../../../hooks/useLoadQuestion'

const Stat:React.FC = () => {
  const {data, loading} = useLoadQuestion()
  return <>
    Stat {loading ? 'loading' : JSON.stringify(data)}
  </>
}

export default Stat