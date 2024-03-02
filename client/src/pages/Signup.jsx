import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center flex justify-center items-center mt-10 font-bold'>Sign Up</h1>
      <form className='flex flex-col gap-4 mt-5'>
        <input type='text' placeholder='Username..'id='username' className='p-3  bg-slate-300 rounded-lg' />
        <input type='email' placeholder='EMail..'id='email' className='p-3  bg-slate-300 rounded-lg' />
        <input type='password' placeholder='Password..'id='password' className='p-3  bg-slate-300 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>SignUp</button>
      </form>

      <div className='mt-5 text-xl font-semibold'><p>Have an account ?<Link to='/sign-in'><span className='text-blue-500 ml-2'>Sign In</span></Link> </p></div>
    </div>
  )
}

export default Signup