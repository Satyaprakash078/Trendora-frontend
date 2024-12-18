import React from 'react'

const ShopPageFilter = ({filters,filterState,setFilterState,clearFilters}) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
        <h3>Filters</h3>
     {/* for categories filter */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Category</h4>
            <hr className='border-y-black'/>
            {
                filters.categories.map((category)=>(
                    <label key={category} className='capitalize cursor-pointer'>
                        <input type="radio" name="category" value={category}
                        checked={filterState.category === category}
                        onChange={(e)=>setFilterState({...filterState,category:e.target.value})}
                        />
                        <span className='ml-1'>{category}</span>
                    </label>
                ))
            }
        </div>
        {/* for color filter */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Colors</h4>
            <hr className='border-y-black'/>
            {
                filters.colors.map((color)=>(
                    <label key={color} className='capitalize cursor-pointer'>
                        <input type="radio" name="colors" value={color}
                        checked={filterState.color === color}
                        onChange={(e)=>setFilterState({...filterState,color:e.target.value})}
                        />
                        <span className='ml-1'>{color}</span>
                    </label>
                ))
            }
        </div>
        {/* for price range filter */}

        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>PriceRange</h4>
            <hr className='border-y-black'/>
            {
                filters.priceRanges.map((price)=>(
                    <label key={price.label} className='capitalize cursor-pointer'>
                        <input type="radio" name="priceRange" 
                        value={`${price.min}-${price.max}`}
                        checked={filterState.priceRange === `${price.min}-${price.max}`}
                        onChange={(e)=>setFilterState({...filterState,priceRange:e.target.value})}
                        />
                        <span className='ml-1'>{price.label}</span>
                    </label>
                ))
            }
        </div>
        {/* clear filters */}
        <button onClick={clearFilters} className='bg-red-500 text-white
         py-1 px-4 rounded-lg'>
            Clear all Filters
        </button>
    </div>
  )
}

export default ShopPageFilter