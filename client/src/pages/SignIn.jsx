import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'

const SignIn = () => {
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      dispatch((signInStart()))
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })

      const data = await res.json()
     
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center flex justify-center items-center mt-10 font-bold'>Sign In</h1>
    <form className='flex flex-col gap-4 mt-5'>
      <input type='email' placeholder='EMail..'id='email' className='p-3  bg-slate-300 rounded-lg' onChange={handleChange} />
      <input type='password' placeholder='Password..'id='password' className='p-3  bg-slate-300 rounded-lg' onChange={handleChange} />
      <button disabled={loading} onClick={handleSubmit} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>{loading ? "Loading..." : "Sign In"} </button>
    </form>

    <div className='mt-5 text-xl font-semibold'><p>Don't have an account ?<Link to='/sign-up'><span className='text-blue-500 ml-2'>Sign Up</span></Link> </p></div>
    <p className='text-red-600 text-xl mt-5'>{error}</p>
  </div>
  )
}

export default SignIn