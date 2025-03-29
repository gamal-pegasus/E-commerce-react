import React, { use, useContext } from 'react'
import Logo from  '../../assets//images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
 const{token,setToken}= useContext(TokenContext)
 const{cartItems}=useContext(CartContext)
  const navigate= useNavigate();
 function logout(){
  localStorage.removeItem('token');
  setToken(null);
  navigate('/login');
 }
  
  
  return <>
  <nav className='bg-white flex  justify-between w-full items-center p-5 z-50 sticky top-0'>
    <div>
      <img src={Logo} alt="logo"/>
    </div>
    <div className="links flex ">
      {token?<ul className='flex space-x-3'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="cart">Cart</Link></li>
        <li><Link to="categories">Categories</Link></li>
        <li><Link to="brands">Brands</Link></li>
        <li><Link to="product">Producs</Link></li>
        <li><Link to="wishlist">Wish List</Link></li>
      </ul>:null}
    </div>

   <div className='flex items-center gap-5' >
   <div className="social space-x-3 ms-auto">
   <Link to="cart">
   <div className="relative">
      <i className="fa-solid fa-cart-shopping text-3xl text-gray-700"></i>

      {cartItems > 0 && (
        <span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md">
          {cartItems}
        </span>
      )}
    </div>
   </Link>
      
    </div>
    <div className='space-x-3 '>
      {token? <button onClick={logout}>Logout</button>:<><Link to="login">LOgin</Link>
        <Link to="register">Register</Link></>}
     
    </div>
   </div>
  </nav>
  </>
  
}
