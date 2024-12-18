import React, { useState } from 'react'
import ProductCards from './ProductCards'
import { useGetProductsQuery } from '../../redux/features/products/productsApi';
const TrendingProducts = () => {
  //declar the this component state varibles
  const [visibleProducts, setVisibleProducts] = useState(8);

     const {data:{products=[],totalPages,totalProducts}={},error,isLoading}=
        useGetProductsQuery({
          limit: visibleProducts
         })
     console.log(products)
 
  const loadingProducts = () => {
    setVisibleProducts(prev => prev + 4);
  }
 
  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader mb-12'>Discover the latest trending products in 2024.
        Trending women's fashin products
      </p>
      {/* product cards adding */}
      <div className='mt-12'>
        <ProductCards products={products.slice(0, visibleProducts)}
          
        />
      </div>
      {/* load more products */}

      <div className='product__btn'>
        {visibleProducts < products.length && (
          <button className='btn' onClick={loadingProducts}>Load More</button>
        )}
      </div>
    </section>
  )
}

export default TrendingProducts