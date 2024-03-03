import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'

const Signup = () => {
  const [formData , setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)

      const res = await fetch('/api/auth/signup',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false)
      if(data.success === false){
        setError(data.message)
        return
      }
      
      // console.log(data);
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }
  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value})
  }
 
  return (    
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center flex justify-center items-center mt-10 font-bold'>Sign Up</h1>
      <form className='flex flex-col gap-4 mt-5'>
        <input type='text' placeholder='Username..'id='username' className='p-3  bg-slate-300 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='EMail..'id='email' className='p-3  bg-slate-300 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='Password..'id='password' className='p-3  bg-slate-300 rounded-lg' onChange={handleChange} />
        <button disabled={loading} onClick={handleSubmit} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>{loading ? "Loading..." : "SignUp"} </button>
      </form>

      <div className='mt-5 text-xl font-semibold'><p>Have an account ?<Link to='/sign-in'><span className='text-blue-500 ml-2'>Sign In</span></Link> </p></div>
      <p className='text-red-600 text-xl mt-5'>{error && 'Something went wrong '}</p>
      <OAuth />
    </div>
  )
}

export default Signup