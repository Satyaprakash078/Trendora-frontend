import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../../redux/features/cart/cartSlice';
import { useGetProductByIdQuery } from '../../../redux/features/products/productsApi';
import ReviewsCard from '../reviews/ReviewsCard';


const SingleProduct = () => {
    const {id}=useParams();
    const dispatch = useDispatch();
    const {data,error,isLoading}=useGetProductByIdQuery(id);
  
    const SingleProduct = data?.product || {};
    const productReviews = data?.reviews || [];
    //console.log(productReviews)

    //handle add to cart button
    const handleAddToCart = (product) => {
      dispatch(addTocart(product));
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error in loading product detailss </div>
   
  return (
      <>
         <section className='section__container bg-neutral-300'>
           <h2 className='section__header capitalize'>Single product page</h2>
           <div className='section__subheader space-x-2'>
                <span className='hover:text-red-500'><Link to='/'>home</Link></span>
                <i className="ri-arrow-right-s-fill"></i>
                <span className='hover:text-red-500'><Link to='/'>shop</Link></span>
                <i className="ri-arrow-right-s-fill"></i>
                <span className='hover:text-red-500'>{SingleProduct.name} </span>
           </div>
          </section>
          
          {/* product details */}
          <section className='section__container mt-8'>
             <div className='flex flex-col items-center md:flex-row gap-8'>
                {/* product image */}
                <div className='md:w-1/3 w-full'>
                <img src={SingleProduct?.image}
                 alt="" className='rounded-md w-full h-auto'/>
                 </div>

                 <div  className='md:w-1/2 w-full'> 
                      <h3 className='text-2xl font-semibold mb-4'>{SingleProduct?.name}</h3>
                      <p className='text-xl text-red-500 mb-4 '>${SingleProduct?.price} 
                        {SingleProduct?.oldPrice && <s className='px-2'> $130</s>}
                      </p>
                      <p className='text-blue-500 mb-4'>{SingleProduct?.description}</p>

                      {/* additional product info */}
                      <div className='flex flex-col space-y-2'>
                        <p><strong>Category:</strong> {SingleProduct?.category}</p>
                        <p><strong>Color: </strong>  {SingleProduct?.color}</p>
                        <div className='flex gap-2 items-center'>
                            <strong>Rating: </strong>
                            <RatingStars rating={SingleProduct?.rating}/>
                        </div>

                      </div>

                      <button onClick={(e)=>{
                        e.stopPropagation();
                        handleAddToCart(SingleProduct)
                      }}
                         className='mt-6 px-6 py-3 bg-red-500 text-white rounded-md'>Add to Cart</button>
                 </div>
             </div>
            
          </section>

          {/* display reviews section */}
          <section className='section__container mt-8'>
            <ReviewsCard productReviews={productReviews}/>
              
          </section>
      
      </>
  )
}

export default SingleProduct