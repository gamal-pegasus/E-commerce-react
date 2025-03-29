
import React from 'react'
import useCategorie from '../Hooks/useCategorie'
import { CircleLoader } from 'react-spinners'

export default function Categories() {
  const{categoriedata,catloading}=useCategorie()
  return<>
  {catloading ?<div className=' flex justify-center items-center min-h-screen'>
  <CircleLoader color='#22C55E' size={80} />
  </div> : <div className=" grid grid-cols-3">
    {categoriedata?.data.data.map((item)=>{
      return <div key={item._id}>
        <img src={item.image} className='h-[400px] w-full' alt="" />
        <div>{item.name}</div>

      </div>

    })}
  </div>}
 
  </>
}

