import React from 'react'

const AdminStats = ({stats}) => {
    console.log(stats)
  return (
    <div className='my-5 space-y-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Earnings</h2>
                <p className='text-2xl font-medium'>${stats?.totalEarningAmount}</p>
            </div>

            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Orders</h2>
                <p className='text-2xl  font-medium'>{stats?.totalOrders}</p>
            </div>

            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Users</h2>
                <p className='text-2xl font-medium'>{stats?.totalUsers}</p>
            </div>

            <div className='bg-white shadow-md rounded-lg border p-5 border-gray-200
            hover:border-purple-500 cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Products</h2>
                <p className='text-2xl font-medium'>{stats?.totalProducts}</p>
            </div>

        </div>
    </div>
  )
}

export default AdminStats