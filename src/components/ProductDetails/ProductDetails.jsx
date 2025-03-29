import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { CircleLoader } from 'react-spinners';

import { Swiper, SwiperSlide } from 'swiper/react';
import { CartContext } from '../Context/CartContext';

export default function ProductDetails() {
  const{addToCart}=useContext(CartContext)
   const {id}=  useParams()
    function getProductDetails(id) {
 return axios.get (`https://ecommerce.routemisr.com/api/v1/products/${id}`)       
   }
 const{data,isLoading}=useQuery({
    queryKey:['ProductDetails',id],
    queryFn:() => getProductDetails(id),
    cacheTime: 0,
    staleTime: 1000 * 60 * 5,
 })
const details=data?.data.data
  return <>
 {isLoading?<div className=' flex justify-center items-center min-h-screen'>
  <CircleLoader color='#22C55E' size={80} />
  </div>: <div className=" container">
    <div className="grid grid-cols-6">
        <div className="imegs col-span-2">
<Swiper>
    <SwiperSlide>
        <img src={details?.imageCover} alt="" />
    </SwiperSlide>
    {details?.images?.map((item,index)=>{
        return <SwiperSlide key={index}>
            <img src={item} alt="" />
        </SwiperSlide>
    })}
</Swiper>
</div>
<div className="cap col-span-4 flex flex-col  justify-center  p-4 ">
 <div className=" grid gap-y-4 ">  
   <h2 className=' font-bold' >{details?.title}</h2>
    <p>{details?.description}</p>
    <span className=' text-green-700 font-bold mt-auto  p-5'>{details?.price}$</span>
   <div className='flex justify-end p-3 ' > <svg className=" inline-block m-2  w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <span>{details?.ratingsAverage}</span>
</div>
</div>
<button onClick={()=>{addToCart(id)}}  className='bg-green-700 p-3 rounded-xl w-[50%] m-auto hover:bg-green-800 text-white font-bold'>add to cart</button>
</div>

</div>      
 </div>}

  </>
}
  
