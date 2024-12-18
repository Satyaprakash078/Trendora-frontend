import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { data, Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const dispatch=useDispatch();
   const [loginUser,{isLoading:loginLoading}]=useLoginUserMutation();
   const navigate=useNavigate();

    const handleLogin=async (e)=>{
        e.preventDefault();
        const userData = { email, password };
        try {
          const response=await loginUser(userData).unwrap();
          const {token,user}=response;
          dispatch(setUser({user}))
          alert('Login successfully')
          navigate('/');  //afterlogin navigte to home page
        } catch (error) {
          console.log(error)
          setMessage('Enter a valid email and password')
        }
        // console.log(userData)
    }
  return (
    <section className='h-screen flex justify-center items-center'>
        <div className='border shadow max-w-sm bg-slate-200 mx-auto p-8'>
            <h2 className='text2xl font-semibold pt-4 '>Please Login</h2>
            <form onSubmit={handleLogin} className='space-y-4 max-w-sm mx-auto pt-8'>
                <input onChange={(e)=>setEmail(e.target.value)} 
                  className='w-full bg-gray-100 focus:outline-double shadow-md px-4 py-2'
                  type="email" name="email" placeholder='Email Address' required />
                <input onChange={(e)=>setPassword(e.target.value)} 
                  className='w-full bg-gray-100 focus:outline-double  shadow-md px-4 py-2' 
                  type="password" name="password" placeholder='Password' required/>
                {

                    message && <p className='text-red-500'>{message}</p>
                }
                <button type='submit' className='w-full mt-5 bg-red-500 text-white 
                hover:bg-indigo-500 font-medium py-3 rounded-md'>Login</button>
            </form>
            <p className='mt-4 italic text-sm text-center'>Don't have an account? 
                <Link className='hover:text-blue-700 underline font-semibold' to="/register"> Register </Link>here.
            </p>
        </div>
   </section>
  )
}

export default Login