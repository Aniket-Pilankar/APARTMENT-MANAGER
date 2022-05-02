import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authState,loginToken } from '../../Redux/LoginSignUp/action';

const Login = () => {

  const [user_login,setuser_login] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const login_handleOn_change = (e) => {
    const {name,value} = e.target;
    setuser_login({
      ...user_login,
      [name]:value
    })
  }
  
  const login_handleOn_submit = (e) => {
    e.preventDefault()
    // let data = JSON.stringify(user_login)
    postLoginData(user_login)
  }

  const postLoginData = (data) => {
    // axios.post(`http://localhost:4040/login`,data).then((res) => {
    axios.post(`https://safe-woodland-51614.herokuapp.com/login`,data).then((res) => {
      // console.log('res:', res)
      const {data} = res
      // console.log('dataLogin:', data)

      dispatch(authState(true))
      dispatch(loginToken(data))

      navigate('/')


    }).catch((error)=>{
      alert('Please try another email or password')
      console.error(error.response.data);

    })
  } 

  return (
    <div>
      <h2>Login</h2>
      <div className='w-25 p-3 m-auto'>
        <form onSubmit={login_handleOn_submit} >
          <div className="mb-3 ">
            <label htmlFor="login-email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" name='email' onChange={login_handleOn_change} />
            
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input type="password" className="form-control" id="login-password" name='password' onChange={login_handleOn_change} />
          </div>
          <input type="submit" className="btn btn-primary" value={'Submit'} />
        </form>
      </div>
    </div>
  )
}

export default Login