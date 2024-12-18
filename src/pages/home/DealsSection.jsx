import React from 'react'
 import dealImg from "../../assets/deals.png"

const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealImg} alt="" />
        </div>
        <div className='deals__content'>
            <h5>GET UPTO 20% DISCOUNT</h5>
            <h4>Deals of The Month</h4>
            <p>Discover the latest trends and express your unique style with our Women's Fashion website. Explore a curated collection of clothing, accessories, and footwear that caters to every taste and occasion.
            </p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                       <h4>14</h4>
                       <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                       <h4>20</h4>
                       <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                       <h4>15</h4>
                       <p>Mins</p>
                </div>
                <div className='deals__countdown__card'>
                       <h4>04</h4>
                       <p>Secs</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DealsSection