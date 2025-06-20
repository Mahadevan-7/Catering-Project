import { useState } from 'react'

import './App.css'
import Home from './frontend/Home'
import Login from './frontend/Login'
import Navbar from './frontend/Navbar'
import { Route, Routes } from 'react-router-dom'
import Register from './frontend/Register'
import Products from './frontend/Products'
import Aboutus from './frontend/Aboutus'
import Footer from './frontend/Footer'
import Cart from './frontend/Cart'
import Payment from './frontend/PAyment'
import PaymentSuccess from './frontend/PaymentSuccess'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home></Home> */}
      <>
  <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/log' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/prod' element={<Products />} />
        <Route path='/abt' element={<Aboutus />} />
        <Route path='/pay' element={<Payment></Payment>}></Route>
        <Route path='/payment-success' element={<PaymentSuccess />} />
      </Routes>
    <Footer />
</>

    </>
  )
}

export default App
