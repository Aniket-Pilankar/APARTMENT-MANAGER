import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFlats from '../AddFlats/AddFlats'
import AddResident from '../AddResident/AddResident'
import HomePage from '../HomePage/HomePage'
import SingleFlatDetails from '../IndividualFlatDetails/SingleFlatDetails'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'
import SignUp from '../SignUp/SignUp'

const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/flatDetails/:id' element={<SingleFlatDetails/>}/>
            <Route path='/addFlats' element={<AddFlats/>}/>
            <Route path='/addresident/:flatId' element={<AddResident/>}/>
            <Route path='*' element={<NotFound/>}/>
            
        </Routes>
        
    </div>
  )
}

export default AllRoutes