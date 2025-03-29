import React, { useState } from 'react'
import { useFormik } from 'formik'
import *as yup from 'yup'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

export default function Register() {
  const validateSchema=yup.object().shape({
    name:yup.string().required('name is required').min(3,'The name must be at least 3 ').max(20,'The name must be more than 20'),
    email:yup.string().required('email is required').email('email must be valid'),
    password:yup.string().required('password is required').matches(/^[A-z0-9_]{6,30}$/,'password must be between 6 and 30 charactres'),
    rePassword:yup.string().required('repassword is required').oneOf([yup.ref('password')],'repassword not match password'),
    phone:yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'phone number must be valid'),
  });
  let [msg,setMsg]=useState('');
  let [loading,setLOading]=useState(false);
  const navigate= useNavigate();

const formik= useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
  },
  onSubmit : async function(values){
    setLOading(true);
   try{
    const res=await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
    setMsg(res.data.message);
    setTimeout(()=>{
      navigate('/login');
    },1000)
   
   }catch(err){
    setMsg(err.response.data.message);

   }finally{
    setLOading(false);
   }
    
  },
  
  validationSchema:validateSchema
 
  //   let errors={};
  //   const passwordRegex=/^[A-z0-9_]{6,20}$/;
  //   const phoneRegex=/^01[1250][0-9]{8}$/

  //   if(values.name.length<3||values.name.length>20){
  //     errors.name="name must be between 3 and 20 characters"
  //   }
  //   if(values.email.includes('@')==false||values.email.includes('.')==false){
  //     errors.email="email must be valid"

  //   }
  //   if (passwordRegex.test(values.password)==false) {
  //     errors.password="password must be between 6 and 20 charactres"
  //   }
  //   if(values.rePassword !==values.password){
  //     errors.rePassword="passwords must match"
  //   }
  //   if(phoneRegex.test(values.phone)==false){
  //     errors.phone="phone number must be valid"
  //   }
  //   return errors;
  // },
});
  
  return <>
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-7">

    <div className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
  </div>
  {formik.errors.name && formik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.name}
</div>
:null}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.email}
</div>
:null}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.password}
</div>
:null}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.rePassword}
</div>
:null}
    <div className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel"  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number </label>
    </div>
    {formik.errors.phone && formik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.phone}
</div>
:null}
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ?'Loading.....':'submit'}</button> 
  {msg=="Account Already Exists" ?<div className="p-4 my-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{msg}</div>:null}

  {msg=="success" ?<div className="p-4 my-4 text-lg text-center text-green-800 rounded-lg bg-green-400 dark:bg-green-500 dark:text-green-600" role="alert">{msg}
  
  </div>:null}
</form>

  </>
}
