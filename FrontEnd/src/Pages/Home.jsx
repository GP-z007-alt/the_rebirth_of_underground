import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import NavBar from '../components/NavBar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/product'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'



const Home = () => {
  const {loading,error,products,productCount} =useSelector((state)=>state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  },[dispatch])
  return (
    <>
    <PageTitle title="Home"/>
    <NavBar/>
    <ImageSlider/>
    <div className="home-container">
      <h2 className='home-heading'>Trending Now</h2>
      <div className="home-product-container">
        {products.map((product,index)=>(
          <Product key={index} product={product}/>
        ))}
      </div>
    </div>
    <Footer/> 
    </>
  )
}

export default Home
