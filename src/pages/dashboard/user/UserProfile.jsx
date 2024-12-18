import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';
import avatarImg from '../../../assets/avatar.png'
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfile = () => {
    const dispatch =useDispatch();
    const {user} =useSelector((state)=>state.auth);
    const [editProfile,{isLoading,isError,error,isSuccess}] =useEditProfileMutation();
    
    const [formData,setFormData]= useState({
        username:'',
        email:'',
        profileImage:'',
        bio:'',
        profession:'',
        userId:''
    })
    const [isModalOpen,setIsModalOpen]= useState(false);

    useEffect(()=>{
        if(user){
            setFormData({
            username: user?.username || '',
            email: user?.email || '',
            profileImage: user?.profileImage || '',
            bio: user?.bio || '',
            profession: user?.profession || '',
            userId: user?._id || ''
            })
        }
    },[user])
     const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
     }

     const handleSubmit=async(e)=>{
         e.preventDefault();
         const updatedUser= {
            username:formData.username,
            email:formData.email,
            profileImage:formData.profileImage,
            bio:formData.bio,
            profession:formData.profession,
            userId:formData.userId
         }
         try {
            const response = await editProfile(updatedUser).unwrap();
            console.log(response)
            dispatch(setUser(response.user));
            localStorage.setItem('user',JSON.stringify(response.user));
            alert('Profile updated successfully!')
         } catch (error) {
            console.log("Failed tto update the profile",error)
            alert('Failed tto update the profile.. Please try again')
         }
         setIsModalOpen(false);
     }

    
  return (
    <div className='container mx-auto p-5'>
        <div className='bg-white shadow-md rounded-lg p-5'>
            <div className='flex items-center mb-2'>
                <img src={formData.profileImage || avatarImg} alt="" className='w-28 h-28 object-cover
                 rounded-full' />
                <div className='ml-5'>
                    <h3 className='text-xl font-semibold'>UserName:{formData?.username || 'N/A'}</h3>
                    <p className='text-gray-700'>User Bio : {formData?.bio || 'N.A'}</p>
                    <p className='text-gray-700'>User Profession : {formData?.profession || 'N.A'}</p>
                </div>
                <button onClick={()=>setIsModalOpen(true)}
                 className='ml-auto text-blue-400 hover:text-blue-700'>
                 <i className="ri-edit-line"></i> <span>Edit</span>
                </button>
            </div>
        </div>

        {/* show modal */}
        {
            isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center 
                justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
                        <button  onClick={()=>setIsModalOpen(false)}
                            className=' absolute top-2 text-white hover:text-gray-600 right-2'>
                            <i className="ri-close-line size-8 p-1 bg-gray-600 rounded-full"></i>
                        </button>
                        <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="username" className='block text-sm font-medium
                                text-gray-700'>Username</label>
                                <input type="text" name='username' value={formData?.username} 
                                onChange={handleChange}
                                placeholder='username'
                                required
                                className='mt-1 p-2 w-full border border-gray-500 rounded-lg shadow-md'/>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="email" className='block text-sm font-medium
                                text-gray-700'>Email address</label>
                                <input type="text" name='email' value={formData?.email} 
                                onChange={handleChange}
                                placeholder='email address'
                                required
                                className='mt-1 p-2 w-full border border-gray-500 rounded-lg shadow-md'/>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="ProfileImage" className='block text-sm font-medium
                                text-gray-700'>ProfileImage</label>
                                <input type="text" name='profileImage' value={formData?.profileImage} 
                                onChange={handleChange}
                                placeholder='ProfileImage Url'
                                required
                                className='mt-1 p-2 w-full border border-gray-500 rounded-lg shadow-md'/>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="bio" className='block text-sm font-medium
                                text-gray-700'>Write your Bio</label>
                                <textarea name="bio" row="3" className='mt-1 p-2 w-full border border-gray-500 rounded-md shadow-md'
                                value={formData?.bio} placeholder='add your bio'
                                onChange={handleChange}></textarea>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="profession" className='block text-sm font-medium
                                text-gray-700'>Profession</label>
                                <input type="text" name='profession' value={formData?.profession} 
                                onChange={handleChange}
                                placeholder='add your profession '
                                required
                                className='mt-1 p-2 w-full border border-gray-500 rounded-lg shadow-md'/>
                            </div>

                            <button className={`mt-4 w-full bg-blue-500 text-white py-2 px-2 rounded-lg
                                ${isLoading ? 'opacity-50 cursor-not-allowed': ''} hover:bg-green-500 text-white`}
                                type='submit'
                                disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save changes'}
                            </button>
                            {isError && <p className='mt-2 text-red-500'>Failed to update the chnages.Please try again...</p>}
                            {isSuccess && <p className='mt-2 text-green-500'>Changes updated successfully!</p>}
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UserProfile