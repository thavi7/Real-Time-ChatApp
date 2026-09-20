import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import App from '../App' 
import Chatpage from '../components/Chatpage'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/chat" element={<Chatpage/>}/>
      <Route path="/about" element={<h1>THis is about page</h1>}/>
      <Route path="*" element={<h1>404 page not found</h1>}/>
    </Routes>
  )
}

export default AppRoutes
