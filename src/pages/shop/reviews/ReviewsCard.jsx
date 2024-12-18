import React, { useState } from 'react'
import avatar from '../../../assets/avatar.png'
import { dateFormat } from '../../../utils/dateFormat';
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCard = ({productReviews}) => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    const reviews = productReviews || [];

    const handleOpenReviewModal=()=>{
        setIsModalOpen(true);
    }
    const handleCloseReviewModal=()=>{
        setIsModalOpen(false);
    }

  return (
    <div className='my-6 bg-white p-8'>
        <div>
            {
                reviews.length >0 ? (<div>
                    <h3 className='text-lg font-medium'>All comments...</h3>
                    <div>
                        {
                            reviews.map((review, index) => (
                                <div key={index} className=' mt-4'>
                                    <div className='flex gap-4 items-center'>
                                        <img src={avatar} alt="" className='size-10' />
                                        <div className='space-y-1'>
                                            <p className='text-sm font-medium underline capitalize
                                            underline-offset-4 text-blue-500 '>{review?.userId?.username}</p>
                                            <p className='text-[12px] italic'>{dateFormat(review?.createdAt)}</p>
                                            <RatingStars rating={review?.rating}/>
                                        </div>
                                    </div>
                                    <div className='text-gray-700 mt-3 border-2 p-3'>
                                        <p className='md:w-4/5'>{review?.comment}</p>
                                    </div>
                                </div>
                            )) 
                        }
                    </div>
                </div>) : <p>No reviews yet !</p>
            }
        </div>
        {/* add review button */}
        <div className='mt-5'>
            <button  onClick={handleOpenReviewModal}
            className='px-3 py-2 bg-red-500 text-white rounded-md'>Add a review</button>
        </div>
        {/* review modal */}
        <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
    </div>
  )
}

export default ReviewsCard