import React, { useState } from 'react'

const SignUp = () => {

  const [user_signUp, setuser_signUp] = useState({})
  
  const signUp_handleOn_change = (e) => {
    const { name, value } = e.target;
    setuser_signUp({
      ...user_signUp,
      [name]: value
    })
  }
  
  const signUp_handleOn_submit = (e) => {
    e.preventDefault()
    console.log('user_signUp:', user_signUp)
  }


  return (
    <div className='w-25 p-3 m-auto'>
      <form onSubmit={signUp_handleOn_submit} >
        <div className="mb-3 ">
          <label htmlFor="signUp-email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="signUp-email" aria-describedby="emailHelp" name='email' onChange={signUp_handleOn_change} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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