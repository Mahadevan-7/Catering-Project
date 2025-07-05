import { useState } from 'react'
import './App.css'
import Home from './frontend/Home'
import Login from './frontend/Login'
import Navbar from './frontend/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './frontend/Register'
import Products from './frontend/Products'
import Aboutus from './frontend/Aboutus'
import Contact from './frontend/Contact'
import Footer from './frontend/Footer'
import Cart from './frontend/Cart'
import Payment from './frontend/Payment'
import PaymentSuccess from './frontend/PaymentSuccess'
import { Dashboard } from './frontend/Dashboard'


const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('token');
  
  return isAuthenticated ? children : <Navigate to="/log" replace />; 
};
function App() {
  

  return (
  <BrowserRouter>
    <>
      
      </>
   <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/log' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/prod' element={<Products />} />
        <Route path='/abt' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pay' element={<Payment></Payment>}></Route>
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/dash' element={<Dashboard />} />
        
      </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App
