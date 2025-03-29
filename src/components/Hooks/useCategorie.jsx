import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export default function useCategorie() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
   const{data:categoriedata,isLoading :catloading}= useQuery({
    queryKey:['Categories'],
    queryFn:getAllCategories,
    refetchOnWindowFocus:false,
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,

    })
  return{categoriedata,catloading}
}
