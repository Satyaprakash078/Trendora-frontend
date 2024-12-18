import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards';
import ShopPageFilter from './ShopPageFilter';
import { useGetProductsQuery } from '../../redux/features/products/productsApi';

const filters={
    categories:['all','accessories','dress','jewellery','cosmetics'],
    colors:['all','red','green','yellow','blue','orange','white','black'],
    priceRanges:[
        {label: 'Under $50',min:0, max:50},
        {label: 'Under $50-$100',min:50, max:100},
        {label: 'Under $100-$200',min:100,max:200},
        {label: 'Under $200 & Above',min:200,max:Infinity},
    ]
}

const ShopPage = () => {
    const [filterState,setFilterState]=useState({
        category:'all',
        color:'all',
        priceRange:''
    })

    const [currentPage,setCurrentPage]=useState(1);
    const [productsPerPage] = useState(8);

    const {category,color,priceRange}=filterState;//destructe the vars
    const [minPrice,maxPrice]= priceRange.split("-").map(Number); //convert the string to num
     
    const {data:{products=[],totalPages,totalProducts}={},error,isLoading}=
       useGetProductsQuery({
            category: category !== 'all' ? category : '',
            color: color !== 'all' ? color : '',
            minPrice: isNaN(minPrice) ? '':minPrice,
            maxPrice: isNaN(maxPrice)? '':maxPrice,
            page: currentPage,
            limit: productsPerPage
        
    })

    //clear the filter
    const clearFilters=()=>{
        setFilterState({
            category:'all',
            color:'all',
            priceRange:''
        })
    }

     //handle page change
     const handlePageChange=(pageNumber)=>{
        if(pageNumber >0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber);
        }
     }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error in loading products</div>

    const startProduct= (currentPage-1) * productsPerPage +1;
    const endProduct = startProduct + products.length - 1 ; 

  return (
      <>
          <section className='section__container bg-neutral-300'>
            <h2 className='section__header capitalize'>shop Page</h2>
            <p className='section__subheader'>Browse a diverse  range of categories,from different styles for different occasions</p>
          </section>
          
          <section className='section__container'>
            <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
               {/* left side filtering options */}
               <ShopPageFilter 
               filters={filters}
               filterState={filterState}
               setFilterState={setFilterState}
               clearFilters={clearFilters}/>
               {/* right side showing filtered products */}
               <div>
                    <h3 className='text-md font-medium mb-4'>
                       Showing {startProduct} to {endProduct} of {totalProducts} products
                    </h3>
                    <ProductCards products={products}/>
                    {/* pagination controls */}
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
               </div>
            </div>
          </section>
      </>
  )
}

export default ShopPage