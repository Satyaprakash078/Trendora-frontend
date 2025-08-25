import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import { useGetProductBySlugQuery } from '../../../redux/features/products/productsApi';
import { useAddReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostAReview = ({isModalOpen,handleClose}) => {
     const {slug}= useParams();
     const {user}= useSelector((state)=> state.auth)
    const [rating,setRating]=useState(0);
    const [comment,setComment]= useState('');
    
    const { data: productData, refetch } =useGetProductBySlugQuery(slug, {skip: !slug});
    const [AddReview]=useAddReviewMutation();

    const handleRating=(value)=>{
        setRating(value);
    }
   
    const handleSubmit=async (e)=>{
        e.preventDefault();
         if (!productData?.product?._id) {
                alert("Product not found");
                return;
        }

        const newComment= {
            comment : comment,
            rating : rating,
            productId: productData.product._id,
            userId : user?._id
        }
        try {
            const response=await AddReview(newComment).unwrap();
            alert('Comment added successfully!');
            setComment('');
            setRating(0);
            refetch();
        } catch (error) {
            alert(error.message)
        }
        handleClose();
    }

  return (
    <div className={`bg-black/90 fixed inset-0 flex items-center justify-center
        px-2 z-40 ${isModalOpen ? 'block':'hidden'}`}>
        <div className='bg-white p-6 rounded-md shadow-lg w-96 z-50'>
            <h2 className='text-lg font-medium mb-4'>Post A Review</h2>
            <div className='flex items-center mb-4'>
                {
                    [1,2,3,4,5].map((star)=>(
                        <span key={star} onClick={()=>handleRating(star)}
                        className='cursor-pointer text-yellow-500 text-lg'>
                            {
                                rating >=star ?(<i className='ri-star-fill'></i>) :
                                (<i className='ri-star-line'></i>)
                            }
                        </span>
                    ))
                }
            </div>
            <textarea 
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                rows="3"
                className='w-full border-2  p-2 border-gray-400 rounded-md mb-4 focus:outline-none'>
             </textarea>
             <div className='flex justify-end gap-2 '>
                <button onClick={handleClose}
                 className='px-3 py-2 bg-gray-300 rounded-md'>Cancel</button>
                <button onClick={handleSubmit}
                className='px-3 py-2 bg-red-500 text-white rounded-md'>Submit</button>
             </div>
        </div>

    </div>
  )
}

export default PostAReview