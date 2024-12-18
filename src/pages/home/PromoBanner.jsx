import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
          <div className='banner__card'>
              <span><i className="ri-truck-line"></i></span>
              <h5>Free Delivery</h5>
              <p className='mt-3'>offers conveince  and the ability to shop from anywhere,anytime</p>
          </div>
          <div className='banner__card'>
              <span><i className="ri-money-dollar-circle-line"></i></span>
              <h5>100% Money Back Gurentee</h5>
              <p className='mt-3'>Our system will review your product and will ensure you moeny back gurentee if needs</p>
          </div>
          <div className='banner__card'>
              <span><i className="ri-customer-service-fill"></i></span>
              <h5 >Customer support</h5>
              <p className='mt-3'>offers customer support services to assist customers with queries and issues</p>
          </div>
    </section>
  )
}

export default PromoBanner