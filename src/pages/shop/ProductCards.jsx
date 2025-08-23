import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../components/RatingStars'
import { useDispatch } from 'react-redux'
import { addTocart } from '../../redux/features/cart/cartSlice'

const ProductCards = ({products}) => {
    const dispatch=useDispatch();
    const handleAddtoCart=(product)=>{
      dispatch(addTocart(product))
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
         {
            products.map((product)=>(
              
              <div key={product._id} className='product__Card'>
                  <div className='relative'>
                      <Link to={`/shop/${product.slug}`}>
                        <img src={product.image} alt={product.name} className='max-h-96 md:h-64
                        w-full object-cover hover:scale-105 transition-all duration-200' />
                      </Link>
                      <div className='hover:block absolute top-2 right-2'>
                        <button onClick={(e)=>{
                          e.stopPropagation();
                          handleAddtoCart(product)}}>
                          <i className="ri-shopping-cart-line bg-red-600 p-1.5 text-white
                        hover:bg-red-800"></i>
                        </button>
                      </div>
                  </div>

                 {/* product description */}
                  <div className='product__card__content'>
                      <h4>{product.name}</h4>
                      <p>${product.price} {product?.oldPrice ? <s>${product?.oldPrice}</s> :
                      null}</p>
                      <RatingStars rating={product.rating}/>
                  </div>
                </div>
            ))
         }
    </div>
  )
}

export default ProductCards