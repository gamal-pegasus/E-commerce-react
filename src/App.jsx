import React from 'react'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/categories/categories'
import Login from './components/Login/Login'
import Register from './components/Register/Registe'
import Products from './components/Products/Products'
import Error from './components/Error/Error'
import TokenContextProvider from './components/Context/TokenContext'
import Guard from './components/Guard/Guard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthGuard from './components/AuthGuard/AuthGuard'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './components/Context/CartContext'
import { Toaster, toast } from 'react-hot-toast';
import WishList from './components/wishList/WishList'

const queryClient = new QueryClient();


const routes= createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {path:'/',element:<Guard><Home/></Guard>},
    {path:'cart',element:<Guard><Cart/></Guard>},
    {path:'wishlist',element:<Guard><WishList/></Guard>},
    {path:'brands',element:<Guard><Brands/></Guard>},
    {path:'categories',element:<Guard><Categories/></Guard>},
    {path:'details/:id',element:<Guard><ProductDetails/></Guard>},
    {path:'login',element:<AuthGuard><Login/></AuthGuard>},
    {path:'register',element:<AuthGuard><Register/></AuthGuard>},
    {path:'product',element:<Guard><Products/></Guard>},
    {path:'*',element:<Error/>},
    
  ]}
],{ basename: "/E-commerce-react" })

export default function App() {
  return <>
  <TokenContextProvider>
    <CartContextProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}/>
    <Toaster/>
    </QueryClientProvider>
    </CartContextProvider>
  
  </TokenContextProvider>
  </>
}
