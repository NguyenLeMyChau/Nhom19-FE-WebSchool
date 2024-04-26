import React from 'react'
import './login.css'

function Login() {
  return (
    <div className='body'>
      <div className='login'>
        <h1 style={{marginTop: 40, color: '#006AF5'}}>Login</h1>
        <form className='login-form'>
          <input type='text' placeholder='Username' className='input'/> <br/>
          <input type='password' placeholder='Password' className='input'/> <br/>
          <button className='button'>Login</button>
        </form>
      </div>
    </div>

  )
}

export default Login
