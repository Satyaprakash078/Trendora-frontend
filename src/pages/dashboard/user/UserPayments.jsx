import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserPayments = () => {
    const {user}= useSelector((state)=>state.auth);
    const {data:ordersdata,error,isLoading}= useGetOrdersByEmailQuery(user?.email);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>No orders found</div>;
    const orders= ordersdata.orders || {};
    const totalPayment =orders?.reduce((acc,order)=> acc+ order.amount,0).toFixed(2);
    //console.log(totalPayment)
  return (
    <div className='px-4 py-3'>
        <h3 className='text-xl  font-semibold mb-4'>Total payments</h3>
        <div>
            <p className='text-gray-800 font-medium text-lg mb-4'>Total spent : ${totalPayment ? totalPayment :0}</p>
            <ul>
                {
                    orders && orders.map((item,index)=>(
                        <li key={index}>
                            <h5 className='font-medium mb-2 text-gray-800'>Order #{index+1}</h5>
                            <div>
                                <span className='text-gray-500 '>Order # ${item?.amount.toFixed(2)}</span>
                            </div>
                            <div className='flex md:flex-row items-center space-x-2 mb-2'>
                                <span className='text-gray-500'>Date : {new Date(item?. createdAt).toLocaleString()}</span>
                                <p className='text-gray-500'>
                                  | Status: <span className={`ml-2 px-2 py-[3px] rounded text-sm
                                    ${item?.status === 'completed' ? 'bg-green-600 text-green-100' :
                                        item?.status === 'pending' ? 'bg-red-600 text-red-100' : item?.status === 'processing' ? 
                                        'bg-blue-600 text-blue-100': 'bg-indigo-900 text-indigo-100'}`}>{item?.status}</span>
                                </p>
                            </div>
                            <hr className='my-2'/>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default UserPayments