import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { CircleLoader } from "react-spinners";
import {  useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import blog1   from '../../assets/images/blog-img-1.jpeg'
import blog2   from '../../assets/images/blog-img-2.jpeg'
import useCategorie from '../Hooks/useCategorie';
export default function Home() {
  const{categoriedata,catloading}=useCategorie()

   function getAallProducts(){
   return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
   const {data,isLoading}= useQuery({

    queryKey:['allProducts'],
    queryFn:getAallProducts,
    refetchOnWindowFocus :false,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
   }
  )
  const allProducts=data?.data.data;
return <>
 <div className=" container m-auto">
  <div className=" grid grid-cols-6 ">
    <div className=" bg-orange-500 col-span-4">
      <Swiper  slidesPerView={1} loop={true} style={{height:"100%"}} >
        <SwiperSlide>
          <img src={slider1} className='w-full h-full block' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2}  className='w-full h-full block' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3}  className='w-full h-full block' alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div className=" bg-yellow-300 col-span-2">
    
        <img src={blog1} className='w-full h-1/2' alt="" />
      
        <img src={blog2} className='h-1/2 w-full' alt="" />
     
    </div>
   
  </div>
  
  <Swiper slidesPerView={6} loop={true}>
   {categoriedata?.data.data.map((item)=><SwiperSlide key={item._id}>
      <img src={item.image} className='h-[200px] w-full' alt="" />
      <div>{item.name}</div>
    </SwiperSlide>)}
  </Swiper>
 

 </div>


 {isLoading ?<div className=' flex justify-center items-center min-h-screen'>
  <CircleLoader color='#22C55E' size={80} />
  </div> : <div className=" container m-auto">
  <div className=" gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
{allProducts.map((product)=><ProductCard key={product._id}  product={product}/>)}  
</div>

  </div>}

  </>
}
