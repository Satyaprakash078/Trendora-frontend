import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/ordersApi';

const UpdateOrderModal = ({order,isOpen,onClose}) => {

    const [status,setStatus] = useState(order?.status);
    const [updateOrderStatus,{isLoading,error}] =useUpdateOrderStatusMutation();
    
    const handleUpdateStatus=async()=>{
       try {
        await updateOrderStatus({id:order?._id,status}).unwrap();
         alert('Order status updated successfully!')
         onClose();
       } catch (error) {
        console.log("Failed to update order status"),error
       }
    }
    if(!isOpen){
        return null;
    }
  return (
    <div className=' fixed inset-0 bg-black flex items-center justify-center
    bg-opacity-80'>
        <div className='bg-white p-3 rounded shadow-lg w-1/3'>
            <h2 className='text-xl mb-4'>Update Order Status</h2>
            
            <div className='mb-4 space-y-4'>
                <label className='block text-md font-medium text-gray-700'>
                   Status
                </label>
               <select value={status}
                onChange={(e)=>setStatus(e.target.value)}
                className='mt-1 bg-gray-300 block w-full shadow-sm sm:text-sm border-gray-700
                rounded-md py-2.5 px-4 focus:outline-none'>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
               </select>
            </div>
            {error && <P>Failed to update the status</P>}

            {/* buttons */}
            <div className='flex justify-end pt-5'>
                <button onClick={onClose}
                className='bg-red-500 text-white px-3 py-2 rounded-md mr-2'>Cancel</button>
                <button onClick={handleUpdateStatus} disabled={isLoading}
                className='bg-indigo-500 text-white px-3 py-2 rounded-md'>
                    {isLoading ? 'Updating...':'Update'}</button>
            </div>
            
        </div>
    </div>
  )
}

export default UpdateOrderModal