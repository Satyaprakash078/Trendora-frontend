import React, { useState } from 'react'
import { useDeleteProductMutation, useGetProductsQuery } from '../../../../redux/features/products/productsApi';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../../../utils/dateFormat';

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading, refetch } = useGetProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage
    })
    //handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    }
    const [deleteProduct]= useDeleteProductMutation();
    //handle delte
    const handleDeleteProduct=async(id)=>{
        try {
            await deleteProduct(id).unwrap();
            alert("Product deleted successfully!")
            await refetch();
        } catch (error) {
            console.log("Error in deleting the product",error)
        }
    }
     
    //pagination
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

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
                                    <h3 className="font-semibold text-base text-blueGray-700 ">All Products</h3>
                                </div>
                                {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div> */}
                            </div>
                            <h3 className='ml-3 my-3 text-sm'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                {/* table headings */}
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Product Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Publishing Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit or manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                            {/* table data body */}
                                <tbody>

                                    {
                                       products && products.map((product, index) => (
                                        <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {startProduct+index}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {product?.name}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {dateFormat(product?.createdAt)}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap
                                         p-4 cursor-pointer hover:text-red-500">
                                            <Link to={`/dashboard/update-product/${product._id}`} className='ml-2'>
                                            Edit</Link>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button onClick={()=>handleDeleteProduct(product._id)}
                                            className='bg-red-500
                                            text-white p-2'>Delete</button>
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
            <div className='flex justify-center mt-5'>
            <button disabled={currentPage === 1}
                        onClick={()=>handlePageChange(currentPage-1)}
                        className='bg-gray-200 text-gray-700 px-4 py-2
                        roundex-md mr-2 '>Previous</button>
                        {
                            [...Array(totalPages)].map((_, index)=>(
                                <button key={index} onClick={()=>handlePageChange(index+1)}
                                 className={`px-4 py-2 ${currentPage === index +1 ?
                                    'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} roundex-md mr-2
                                }`}>
                                    {index + 1}
                                </button>
                            ))
                        }
                        <button disabled={currentPage === totalPages}
                         onClick={()=>handlePageChange(currentPage+1)}
                        className='bg-gray-200 text-gray-700 px-4 py-2
                        roundex-md mr-2 '>Next</button>
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
        </> 
    )
}

export default ManageProduct