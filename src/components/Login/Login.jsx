import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import *as yup from 'yup'
import { TokenContext } from '../Context/TokenContext'

export default function Login() {
  const navigate=useNavigate();
  let [flag,setFlag]= useState(false);
  const validationSchema=yup.object().shape({
    email:yup.string().required('email is required').email('email must be valid'),
    password:yup.string().required('password is required ').matches(/^[A-z0-9_]{6,30}$/,'password must be between 6 and 30 charactres'),
  })
  const {token,setToken}=useContext(TokenContext)
  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:async function(values){
     try{
      setFlag(true);
      const res= await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
      setToken(res.data.token);
      localStorage.setItem('token',res.data.token)
      setTimeout(()=>{
        navigate('/');
      },1000)
     }catch(err){
      console.log(err);
     }finally{
      setFlag(false);
     }
    },
    validationSchema
  })
  return <>
<form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto py-5">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input  onBlur={formik.handleBlur} onChange={formik.handleChange}  type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input  onBlur={formik.handleBlur} onChange={formik.handleChange}  type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{flag?'Loadind....':'Submit'}</button>
</form>


  
  </>
}





