import React, { useState } from 'react'
import './login.css'
import axios from 'axios'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const url = 'http://localhost:8081/login/'
    const response = await axios.post(url, {
      username: username,
      password: password
    })

    console.log('response.data: ', response.data)

    if (response.data) {
      alert(response.data.message)
      console.log('response.data.object: ', response.data.object)
      localStorage.setItem('student', JSON.stringify(response.data.object))
      window.location.href = '/home'
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-body'>
      <div className='login-content'>
        <div className='login-container'>
          <h1 style={{ marginBottom: 30, color: '#006AF5' }}>Login</h1>
          <form className='login-form' onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' className='login-input' value={username} onChange={e => setUsername(e.target.value)} /> <br />
            <input type='password' placeholder='Password' className='login-input' value={password} onChange={e => setPassword(e.target.value)} /> <br />
            <button type='submit' className='login-button'>Login</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
