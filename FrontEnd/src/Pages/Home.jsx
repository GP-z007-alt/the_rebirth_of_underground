import React from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import NavBar from '../components/NavBar'
import ImageSlider from '../components/ImageSlider'

const Home = () => {
  return (
    <>
    <NavBar/>
    <ImageSlider/>
    <div className="home-container">
      <h2 className='home-heading'>Trending Now</h2>
    </div>
    <Footer/> 
    </>
  )
}

export default Home
