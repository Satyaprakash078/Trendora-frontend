import React from 'react'

const UserStats = ({stats}) => {
  return (
    <div className='my-4 space-y-4'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-serif mb-2'>Total payments</h2>
                <p className='text=2xl font-semibold'>${stats?.totalPayments}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-serif mb-2'>Total Reviews</h2>
                <p className='text=2xl font-semibold'>{stats?.totalReviews}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-serif mb-2'>Total PurchasedProducts</h2>
                <p className='text=2xl font-semibold'>{stats?.totalPurchasedProducts}</p>
            </div>
        </div>
        
    </div>
  )
}

export default UserStats