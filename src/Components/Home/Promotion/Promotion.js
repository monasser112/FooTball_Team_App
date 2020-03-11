import React from 'react'
import PropmotionAnimation from './PromotionAnimation'
import Enroll from './Enroll'
const Promotion = () => {
    return (
        <div
         className="promotion_wrapper"
         style={{background:'#ffffff'}}
         >
         <div className="container">
             <PropmotionAnimation />
             <Enroll />
         </div>
            
        </div>
    )
}

export default Promotion
