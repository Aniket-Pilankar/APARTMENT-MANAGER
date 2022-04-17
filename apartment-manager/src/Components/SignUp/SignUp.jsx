import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const [user_signUp, setuser_signUp] = useState({})

  const navigate = useNavigate()
  
  const signUp_handleOn_change = (e) => {
    const { name, value } = e.target;
    setuser_signUp({
      ...user_signUp,
      [name]: value
    })
  }
  


  const signUp_handleOn_submit = (e) => {
    e.preventDefault();
    let data = JSON.stringify(user_signUp)
    postSignUpData(data)
  }

  const postSignUpData = async(data) => {
    console.log('data:', data)
    try {
      let res = await fetch(`http://localhost:4040/register`,{
        method:'POST',
        body:data,
        headers:{
          'Content-type':'application/json'
        }
        
      })
      console.log('res:', res)
      let response = await res.json()
      console.log('response:', response)

      if (response.user === undefined) {
        alert('Please try another email')
        return
    }

    alert(`${response.user.name} your account has been created`)

    navigate('/login')

    } catch (error) {
      console.log('error in postSignUpData:', error)
      
    }
  } 
  // const postSignUpData = () => {
  //   axios.post(`http://localhost:4040/register`,user_signUp).then((res) => {
  //     console.log('res:', res)
  //     console.log('user_signUp:', user_signUp)

  //   }).catch((error) => {
  //     // console.log('error in signUp_handleOn_submit function')
  //     console.error(error.response.data);
  //   })
  // }


  return (
    <div className='w-25 p-3 m-auto'>
      <form onSubmit={signUp_handleOn_submit} >
        <div className="mb-3 ">
          <label htmlFor="signUp-name" className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" id="signUp-name"  name='name' onChange={signUp_handleOn_change} />
        
        </div>
        <div className="mb-3 ">
          <label htmlFor="signUp-email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="signUp-email" aria-describedby="emailHelp" name='email' onChange={signUp_handleOn_change} />
          
        </div>
        <div className="mb-3">
          <label htmlFor="signUp-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="signUp-password" name='password' onChange={signUp_handleOn_change} />
        </div>
        <input type="submit" className="btn btn-primary" value={'Submit'} />
      </form>
    </div>
  )
}

export default SignUp