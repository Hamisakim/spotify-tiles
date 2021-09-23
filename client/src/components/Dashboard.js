import React from 'react'
import useAuth from '../useAuth'
const Dashboard = ({ code }) => {
  const accessToken = useAuth(code)
  console.log('🦄 ~ Dashboard ~ accessToken', accessToken)
  return (
    <div>
      {code}
    </div>
  )
}

export default Dashboard
