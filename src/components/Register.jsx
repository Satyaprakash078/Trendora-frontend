import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {

    const [message,setMessage]=useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [registerUser,{isLoading}]=useRegisterUserMutation();
    const navigate=useNavigate();

    const handleRegister=async (e)=>{
        e.preventDefault();
        const userData = { username,email, password };
        try {
            await registerUser(userData).unwrap();
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            setMessage("Registration failed");
        }
        console.log(userData)
    }
  return (
    <section className='h-screen flex justify-center items-center'>
        <div className='border shadow max-w-sm bg-slate-200 mx-auto p-8'>
            <h2 className='text2xl font-semibold pt-4 '>Please Register</h2>
            <form onSubmit={handleRegister} className='space-y-4 max-w-sm mx-auto pt-8'>
                <input onChange={(e)=>setUsername(e.target.value)} 
                    className='w-full bg-gray-100 focus:outline-double shadow-md px-4 py-2'
                    type="text" name="username" placeholder='UserName' required />
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
                hover:bg-indigo-500 font-medium py-3 rounded-md'>Register</button>
            </form>
            <p className='mt-4 italic text-sm text-center'>Alredy have an account? 
                <Link className='hover:text-blue-700 underline font-semibold' to="/login"> Login </Link>here.
            </p>
        </div>
    </section>
  )
}

export default Register