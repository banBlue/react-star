import React, {useState, useEffect} from 'react'
import useLoadQuestion from '../../../hooks/useLoadQuestion'

const Edit:React.FC = () => {
  const {data, loading} = useLoadQuestion()
  return <>
    Edit {loading ? 'loading' : JSON.stringify(data)}
  </>
}

export default Edit