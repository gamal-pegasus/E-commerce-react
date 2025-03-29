import React, { createContext, useEffect, useState } from 'react'
export  const TokenContext=createContext();

export default function TokenContextProvider({children}) {
  let[token,setToken]= useState(null)
  useEffect(()=>{
    setToken(localStorage.getItem('token')) 
  })

  return<>
  <TokenContext.Provider value={{token,setToken}}>
  {children}

  </TokenContext.Provider>
  
  </> 
}
