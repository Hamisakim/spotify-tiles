import React from 'react'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './components/Dashboard'


const code = new URLSearchParams(window.location.search).get('code')
console.log('🦄 ~ code', code)

function App() {
 

  return <>
    <Login/>
    <Dashboard/>

  </>
}

export default App
