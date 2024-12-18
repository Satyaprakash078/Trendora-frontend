import React from 'react'
import { useSelector } from 'react-redux'
import { useGetReviewsByIdQuery } from '../../../redux/features/reviews/reviewsApi';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
    const {user} =useSelector((state)=>state.auth);
    const {data,error,isLoading} = useGetReviewsByIdQuery(user._id);
    const navigate= useNavigate();
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to load reviews</div>
    const reviews = data?.reviews || []; 
  // console.log(reviews)

  const handleCardClick=()=>{
     navigate('/shop')
   }
  return (
    <div className='py-6'>
        <h2 className='text-xl font-bold mb-4'>Your given reviews here</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {
                reviews && reviews.map((review,index)=>(
                    <div key={index} className='bg-blue-100 shadow-md rounded-lg p-4 border-gray-800
                     cursor-pointer hover:scale-105 transition-all duration-200'>
                        <p className='text-lg font-serif mb-2'>Rating : {review?.rating}</p>
                        <p className='mb-2 font-sans'><strong>Comment : </strong> {review?.comment}</p>
                        <p className='text-sm text-gray-500'><strong>ProductId : </strong> {review?.productId}</p>
                        <p className='text-sm text-gray-500'><strong>Date : </strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
                    </div>
                ))
            }
            <div onClick={handleCardClick}
             className='bg-pink-100 text-black flex items-center justify-center rounded-lg
            p-6 border cursor-pointer hover:bg-red-500  hover:text-white transition-all'>
                <span className='px-2'>+ </span>
                <p> Add New Review</p>
            </div>
        </div>
    </div>
  )
}

export default UserReviews