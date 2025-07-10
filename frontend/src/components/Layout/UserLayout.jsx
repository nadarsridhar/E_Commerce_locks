import React from 'react'
import Header from "../common/Header"
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

const userlayout = () => {
  return( 
  <>
  {/* {Header} */}
  <Header />
  {/* {Main content} */}
  <main>
    <Outlet/>
  </main>
  {/* {Footer} */}
  <Footer/>
  </>
  )
}

export default userlayout