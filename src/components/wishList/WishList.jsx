import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/CartContext'

export default function WishList() {
const {wish,getLoggedUserWishlist,addToCart,removeItemWish}=useContext(CartContext);
useEffect(()=>{
    getLoggedUserWishlist();
},[])
  return <>
  <div className=" container w-[90%] my-5 bg-slate-200 m-auto">
    <div className="row">
    <h1 className="text-3xl p-7 font-mono mb-6 ">My Wish List</h1>
   {wish?.map((item)=> <div key={item._id} className="flex  items-center  p-3 border-b-[1px] border-gray-500 ">
        <div className="image w-[20%]">
            <img src={item.imageCover} className='w-full' alt="" />
        </div>
        <div className="cap flex justify-between items-center w-full mt-3">
            <div className='p-3'>
                <h3 className='font-bold'>{item.title}</h3>
            <h4 className='text-green-600 font-bold'>{item.price} EGP</h4>
            <button onClick={()=>removeItemWish(item._id)}  className='text-red-600 '>
                <i className='fa fa-trash'> </i>
                Remove
            </button>
            </div>
            <div>
                <button onClick={()=>addToCart(item._id)} className='p-5 border border-green-400 rounded-lg '> add To Cart</button>
            </div>
        </div>
    </div>)}
    </div>
  
  </div>

  </>
}
