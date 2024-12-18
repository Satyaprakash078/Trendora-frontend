import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';
import {loadStripe} from '@stripe/stripe-js';
import { getBaseURL } from '../../utils/baseUrl';
const OrderSummary = () => {
    const dispath=useDispatch();
     const {user}=useSelector(state=>state.auth);
   
    const products=useSelector((store)=>store.cart.products);
    const {selectedItems,totalPrice,tax,taxRate,grandTotal}=useSelector((store)=>store.cart)
   
    const handleClearCart=()=>{
      dispath(clearCart());
    }

    //payment integration
    const makePayment=async (e)=>{
      const stripe= await loadStripe(import.meta.env.VITE_STRIPE_PK);
      const body={
        products:products,
        userId: user?._id
      }
       
      const headers={
        'Content-Type':'application/json',
      }
      const response = await fetch(`${getBaseURL()}/api/orders/create-checkout-session`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      })
      const session= await response.json();
       console.log("session:",session)
      const result= await stripe.redirectToCheckout({
        sessionId : session.id
      })
      console.log("Result:",result)
      if(result.error){
        console.log("Error:",result.error)
      }
    }
  return (
    <div className='bg-gray-200 mt-5 rounded text-base'>
        <div className='px-4 py-2 space-y-3'>
            <h4 className='text-xl text-black px-1'>Order Summary</h4>
            <p className='text-black mt-2'>Selected Items: {selectedItems}</p>
            <p>TotalPrice: ${totalPrice.toFixed(2)}</p>
            <p>Tax({taxRate * 100}%): ${tax.toFixed(2)}</p>
            <h3 className='font-bold'>GrandTotal:${grandTotal.toFixed(2)}</h3>
            <div className='px-3 mb-5'>

                <button onClick={(e)=>{e.stopPropagation();handleClearCart()}}
                  className='bg-red-600 text-white flex justify-between
                  items-center px-2 py-1 mb-3 mt-2 rounded-md'><span className='mr-2'>Clear cart</span>
                  <i className="ri-delete-bin-6-line"></i>
                </button>

                <button onClick={(e)=>{
                  e.stopPropagation();
                  makePayment();
                }}
                className='bg-green-600 text-white flex justify-between
                items-center px-2 py-1 mb-3 mt-2 rounded-md'><span className='mr-2'>Proceed to checkout</span> 
                <i className="ri-bank-card-line"></i></button>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary