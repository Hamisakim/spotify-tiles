/* eslint-disable no-unused-vars */
import React,{ useState , useEffect } from 'react'
import axios from 'axios'

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()



  useEffect(() => {
    axios.post('/api/login', { code })
      .then(res => {
        console.log(res.data)
      })
   
  
  }, [code])




  return (
    <div>
       
    </div>
  )
}

export default useAuth
