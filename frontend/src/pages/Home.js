import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'

function Home() {
  return (
    <div>
      <Navbar />
      <ImageSlider/>
      <div>
        Latest products
      </div>
      <Footer/>
    </div>
  )
}

export default Home