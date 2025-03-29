import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import axios from 'axios'
import { CircleLoader } from 'react-spinners'

export default function Cart() {
  const{getCartItems,allCartItems ,updateCartItemCount,totalCartPrice ,setCartItems}=useContext(CartContext)  
  async function removeItem(id) {
  const res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token:localStorage.getItem('token')}})
 
  getCartItems();
  setCartItems(res.data.numOfCartItems);

  }
useEffect(()=>{
  getCartItems();
  
},[])
  return<>

  {allCartItems.length!=0?<><div className=" top-16 z-50">
  <div className="inline-block text-2xl fa fa-sack-dollar font-bold text-yellow-500 ">
    <h3 className='p-1 font-mono inline-block text-amber-950'>Total Cart Price :</h3>
    <p className="text-green-700 p-2 inline-block">{totalCartPrice}</p>
    
  </div>
</div><div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {allCartItems.map((item,index)=><tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 w-[30%] font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button disabled={item.count==1} onClick={()=>updateCartItemCount(item.product.id,item.count-1)}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
               <span>{item.count}</span>
            </div>
            <button onClick={()=>updateCartItemCount(item.product.id,item.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${item.price}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>{removeItem(item.product.id)}} className="font-medium bg-red-600 text-white p-2 hover:bg-red-800 rounded-lg dark:text-red-500 ">Remove</button>
        </td>
      </tr>
     )}
      
    </tbody>
  </table>
</div>
</>:<div className='bg-green-900 font-bold text-center text-white'>Cart IS Empty</div>}


  </>
}
