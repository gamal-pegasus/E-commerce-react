import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { TokenContext } from './TokenContext'
import toast from 'react-hot-toast'
  export const CartContext=createContext()

export default function CartContextProvider({children}) {
 const{token} = useContext(TokenContext)
 const [cartItems,setCartItems]=useState([])
 const [allCartItems,setallCartItems]=useState([])
 const[totalCartPrice,setTotalCartPrice]=useState(0)
 const [liked,setLiked]=useState({})
 const [wish,setWish]=useState([])
const createLikedObject=(data)=>{
  return data.reduce((acc,item)=>{
    const id=typeof item==='object'?item.id:item;
    acc[id]=true;
    return acc;
  },{})
}
 async function addToCart(productId){
  try{
    const res=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId },{
      headers:{token}})
      if(res.data.status=='success'){
        toast.success('product added Successfully');
        setCartItems(res.data.numOfCartItems);
      }
  }catch(err){
    console.log('errrr');
    toast.error('Failed to add product. Please try again!');

}
 }
 async function getCartItems() {
  try{
  const res=await  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
     headers:{token:localStorage.getItem('token')}
   })
  if(res.data.status=="success"){
   setTotalCartPrice(res.data.data.totalCartPrice);
   setallCartItems(res.data.data.products)
   setCartItems(res.data.numOfCartItems)

  } 
  }catch(err){
   console.log(err);
  }
   
  }
useEffect(()=>{
  getCartItems();
  getLoggedUserWishlist();
  
},[])
 async function updateCartItemCount(id,count){
  try{
   const res=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token}})
  
   if(res.data.status=="success"){
    
    // setallCartItems((prevItems)=>(prevItems).map((item)=>item.product.id==id? { ...item, count } : item))
    setallCartItems(res.data.data.products);
    setTotalCartPrice(res.data.data.totalCartPrice);
   }
   

  }catch(err){
    console.log(err,"erorr");
    
  }
 }

 async function addliKedItem(id){
 try{
  const res=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:id},{headers:{token}})

if (res?.data.status=='success') {
console.log(res,'add');
console.log(liked,'liked',typeof liked);


if(liked.hasOwnProperty(id)){
 
  removeItemWish(id);

}
else{
  setLiked(createLikedObject(res.data.data));

}


}
  
 }catch(err){
  console.log(err,'error');
  
 }
  

 }
 
async function getLoggedUserWishlist(){
try{
  const res=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers:{token:localStorage.getItem('token')}}); 
  console.log(res.data.data);
  
  if(res.data.status=='success'){
    
    setWish(res.data.data)
    setLiked(createLikedObject(res.data.data));  
  }
}catch(err){
  console.log(err,'error');
  
}
  
}


async function removeItemWish(id){
 try{
  const res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token:localStorage.getItem('token')}})
  if(res.data.status=="success"){
    getLoggedUserWishlist();
  }
 }catch(err){
  console.log(err,'error');
  
 }
} 




  return <CartContext.Provider value={{addToCart,cartItems,setCartItems,getCartItems,allCartItems ,updateCartItemCount,totalCartPrice,setCartItems,addliKedItem,liked,wish,removeItemWish ,getLoggedUserWishlist}}>
    {children}
  </CartContext.Provider>
}
