import React from 'react'
import OrderSummary from './OrderSummary'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const CartModal = ({products,isOpen,onClose}) => {

    const dispath=useDispatch();
    const handleQuantity=(type,id)=>{
        const payload={type,id}
        dispath(updateQuantity(payload))
    }

    const handleRemove=(e,id)=>{
        e.preventDefault();
        dispath(removeFromCart({id}))
    }
  return (
    <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ?
        "opacity-100":"opacity-0 pointer-events-none" }`}
        style={{transition:'opacity 300ms'}}>
       {/*on right side cart portion will show up */}
        <div className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto
            transition-transform ${isOpen ? 'translate-x-0':'translate-y-full'}`}
            style={{transition:'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)'}}>
                <div className='mt-4 p-4'>
                    <div className='flex justify-between items-center mb-4'>
                         <h4 className='text-xl font-semibold'>Your Cart Items</h4>
                         <button 
                           onClick={onClose} 
                           className='text-white hover:text-gray-900'>
                           <i className="ri-xrp-fill bg-red-500 p-1"></i>
                         </button>
                    </div>
                    {/* inside cart items details */}
                    <div>
                        {
                            products.length==0 ?(<div>Your cart is empty.</div>) : (
                                products.map((item,index)=>(
                                    <div key={index} className='flex flex-col md:flex-row
                                      md:items-center md:justify-between shadow-lg md:p-4 p-2 mb-4'>
                                        <div className='flex items-center'>
                                            <span className='mr-4 px-1 bg-red-500 text-white
                                               rounded-full'>0{index +1}</span>
                                            <img src={item.image} alt=""  className='size-14 object-cover mr-4'/>
                                            <div>
                                                <h5 className='text-lg font-serif'>{item.name}</h5>
                                                <p>${Number(item.price).toFixed(2)}</p>
                                            </div>
                                            {/* now quantity - + button */}
                                            <div className='flex flex-row md:justify-start justify-end
                                              items-center mt-2'>
                                                <button onClick={()=>handleQuantity('decrement',item.id)}
                                                className='size-6 flex items-center
                                                justify-center px-1.5 rounded-full bg-gray-200
                                                text-gray-500 hover:bg-red-500 hover:text-white
                                                ml-6'> - </button>
                                                <span className='px-1 text-center mx-1'>{item.quantity}</span>
                                                <button onClick={()=>handleQuantity('increment',item.id)}
                                                 className='size-6 flex items-center
                                                justify-center px-1.5 rounded-full bg-gray-200
                                                text-gray-500 hover:bg-red-500 hover:text-white
                                                ml-1'> + </button>

                                                {/* button for remove from cart */}
                                                <div className='ml-5'>
                                                    <button onClick={(e)=>handleRemove(e,item.id)}
                                                    className=' text-red-500 hover:text-red-800
                                                    mr-4 rounded-sm'>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))
                            )
                        }
                    </div>
                     {/* cart item caluculation */}
                     {
                        products.length > 0 && (
                            <OrderSummary/>
                        )
                     }

                </div>
 
        </div>
        
    </div>
  )
}

export default CartModal