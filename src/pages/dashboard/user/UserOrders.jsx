import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { Link } from 'react-router-dom';

const UserOrders = () => {
    const {user}=useSelector((state)=>state.auth);
    const {data,error,isLoading} = useGetOrdersByEmailQuery(user?.email);
      const orders= data?.orders;
      console.log(orders);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No order found!</div>
    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ORDER ID
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        DATE
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        STATUS
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        TOTAL
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        VIEW ORDER
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders && orders.map((order,index)=>(
                                        <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index +1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {order.OrderId}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {new Date(order?.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           <span className={`p-1 rounded ${order?.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order?.status === 'pending' ? 'bg-red-100 text-red-700' : order?.status === 'processing' ? 
                                            'bg-blue-100 text-blue-600': 'bg-indigo-100 text-indigo-600'}`}>
                                            {order?.status}
                                            </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {order?.amount}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                            <Link to={`/orders/${order?._id}`} className="underline hover:text-red-500">View order</Link>
                                        </td>
                                    </tr>
                                    ))
                                }
                               
                                
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default UserOrders