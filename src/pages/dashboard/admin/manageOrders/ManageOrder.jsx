import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/ordersApi'
import { Link } from 'react-router-dom';
import UpdateOrderModal from './UpdateOrderModal';
import { dateFormat } from '../../../../utils/dateFormat';

const ManageOrder = () => {
    const { data: orders, isLoading, error, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteOrder] = useDeleteOrderMutation();
   

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert("Order delted successfully!")
            refetch();
        } catch (error) {
            console.log("Error in deleting the order", error)
        }
    }
       
    // if (isLoading) return <div>Loading...</div>
    // if (error) return <div>Something went wrong...</div>

    return (
        <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>Error...</div>
            }
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700 ">All Orders</h3>
                                </div>
                                {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                        </div> */}
                            </div>

                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                {/* table headings */}
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            OrderId
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Customer
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Status
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {/* table data body */}
                                <tbody>

                                    {
                                        orders && orders.map((order, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {order?.OrderId}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {order?.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <span className={`rounded-full px-2 py-[2px] ${getColorStatus(order?.status)}`}>
                                                {order?.status}</span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {dateFormat(order?.updatedAt)}
                                                </td>
                                                <td className="flex items-center px-6 py-3 space-x-3  border-b text-xs whitespace-nowrap
                                                   p-4 cursor-pointer">
                                                    <Link to='#'className='ml-2 hover:text-purple-700'>View</Link>
                                                    <button onClick={()=>handleEditOrder(order)}
                                                        className='hover:text-blue-500 hover:underline'>Edit</button>
                                                    <button onClick={()=>handleDeleteOrder(order?._id)}
                                                         className='hover:text-red-500 hover:underline'>Delete</button>
                                                </td>
                                                
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination  */}
                {/* <div className='flex justify-center mt-5'>
                    <button disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='bg-gray-200 text-gray-700 px-4 py-2
                roundex-md mr-2 '>Previous</button>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button key={index} onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ?
                                    'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} roundex-md mr-2
                        }`}>
                                {index + 1}
                            </button>
                        ))
                    }
                    <button disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='bg-gray-200 text-gray-700 px-4 py-2
                roundex-md mr-2 '>Next</button>
                </div> */}
                <footer className="relative pt-8 pb-6 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Satya</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>

            {/* update order modal */}
            {
                selectedOrder && (
                <UpdateOrderModal 
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />)
            }
        </>
    )
}

const getColorStatus = (status) => {
    switch (status) {
        case 'completed':
            return 'bg-green-700 text-white';
        case 'processing':
            return 'bg-blue-500 text-white';
        case 'pending':
            return 'bg-amber-500 text-white';
        case 'shipped':
            return 'bg-orange-500 text-white';
        default:
    }
}

export default ManageOrder