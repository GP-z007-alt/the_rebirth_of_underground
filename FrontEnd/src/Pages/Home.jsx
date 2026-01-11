import React from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import NavBar from '../components/NavBar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/product'
import PageTitle from '../components/PageTitle'
const  products=[ 
        {
            "_id": "6950617dc1a3f8d5fe598f0e",
            "name": "Product2",
            "description": "Product description 2",
            "price": 200,
            "ratings": 4,
            "image": [
                {
                    "public_id": "This is a test ID2",
                    "url": "This is a test URL2",
                    "_id": "6950617dc1a3f8d5fe598f0f"
                }
            ],
            "category": "Gun2",
            "stock": 1,
            "numofReviews": 1,
            "reviews": [
                {
                    "user": "69531d32d4abd8a52cef038d",
                    "name": "GokulPrasath",
                    "ratings": 4,
                    "comment": "Shoots nice bang bang :thumbsup",
                    "_id": "69543ccae6b468e42a948d0e"
                }
            ],
            "createdAt": "2025-12-27T22:45:17.178Z",
            "__v": 2
        },
        {
            "_id": "695061de2e8506b146f5738f",
            "name": "Product2",
            "description": "Product description 2",
            "price": 200,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is a test ID2",
                    "url": "This is a test URL2",
                    "_id": "695061de2e8506b146f57390"
                }
            ],
            "category": "Gun2",
            "stock": 1,
            "numofReviews": 0,
            "reviews": [],
            "createdAt": "2025-12-27T22:46:54.912Z",
            "__v": 0
        },
      ]

const Home = () => {
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
