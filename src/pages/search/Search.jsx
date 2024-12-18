import React, { useEffect, useRef, useState } from 'react'
import productsData from "../../data/products.json"
import ProductCards from '../shop/ProductCards';


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts,setFilteredProducts]=useState(productsData);
    const searchInputRef = useRef(null);

    const handleSearch=()=>{
        const query=searchQuery.toLowerCase();
        const filtered=productsData.filter(product=>product.name.toLowerCase().includes(query) ||
                       product.description.toLowerCase().includes(query));
        
          setFilteredProducts(filtered);
    }
     // Use useEffect to focus the input when the component mounts
     useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Focus the input
        }
    }, []); // Empty dependency array means this runs once on mou
  return (
      <>
           <section className='section__container bg-neutral-300'>
          <h2 className='section__header capitalize'>Search results</h2>
          <p className='section__subheader'>Browse a diverse  range of categories,
            from different styles for different occasions</p>
      </section>

      <section className='section__container'>
            <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-2'>
                <input type="text"
                value={searchQuery} 
                onChange={(e)=>setSearchQuery(e.target.value)}
                ref={searchInputRef}
                className='search-bar w-full max-w-4xl p-2 border-4 rounded-xl'
                placeholder='Search for the products...'
                />

                <button  onClick={handleSearch} 
                className='search-btn w-full md:w-auto p-2 px-8 text-white
                 border rounded-xl bg-red-500 hover:bg-gray-700'>Search</button>

            </div>
            <ProductCards products={filteredProducts}/>
      </section>
      
      </>
  )
}

export default Search