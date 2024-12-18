import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from "../../data/products.json"
import ProductCards from '../shop/ProductCards';

export const CategoryPage = () => {

    const {categoryName}=useParams();
    const [filteredProducts,setFilteredProducts]=useState([]);

    useEffect(()=>{
        const filtered=products.filter((product)=>product.category===categoryName.toLowerCase());
        setFilteredProducts(filtered)
    },[categoryName]);

    // to load the page from top
    useEffect(()=>{
        window.scrollTo(0,0);
    })

  return (
    <>
      <section className='section__container bg-neutral-300'>
          <h2 className='section__header capitalize'>{categoryName}</h2>
          <p className='section__subheader'>Browse a diverse  range of categories,from different styles for different occasions</p>
      </section>

      {/* show filter product cards */}
      <div className='section__container'>
        <ProductCards products={filteredProducts}/>
      </div>
    </>
  )
}

