import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import SignUp from '../SignUp/SignUp'

const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        
    </div>
  )
}

export default AllRoutes