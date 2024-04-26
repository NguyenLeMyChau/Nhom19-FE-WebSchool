import React from 'react'
import './login.css'


function Login() {
  return (
    <div className='login-body'>
      <div className='login-content'>
        <div className='login-container'>
          <h1 style={{ marginBottom: 30, color: '#006AF5' }}>Login</h1>
          <form className='login-form'>
            <input type='text' placeholder='Username' className='login-input' /> <br />
            <input type='password' placeholder='Password' className='login-input' /> <br />
            <button className='login-button'>Login</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
