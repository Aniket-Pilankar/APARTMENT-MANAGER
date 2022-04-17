import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const HomePage = () => {

  const authState_form_store =  useSelector((store) => (store.login.authState))

  // if(!authState_form_store){
  //   return <Navigate to={'/login'}/>
  // }

  return (
    <div>HomePage</div>
  )
}

export default HomePage