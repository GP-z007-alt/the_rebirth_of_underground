import React, { useState } from 'react'
import '../componentStyles/Product.css'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    // console.log(product);
    const [rating,setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(`Rating Changed To : ${newRating}`);
        
    };
  return (
    <Link to={`${product._id}`} className="product_id">
    <div className="product-card">
        <img src={product.image[0].url} alt={product.name}></img>
        <div className="product-details">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price"><strong>Price</strong> {product.price}</p>
            <div className="rating_container">
                <Rating
                value={product.ratings}
                onRating={handleRatingChange}
                disabled={true}
                />
            </div>
            <span className="productCardSpan">
                ( {product.numofReviews} {product.numofReviews === 1 ? ' Review' : ' Reviews' } )
            </span>
            <button className="add-to-cart">View Details</button>
        </div>
    </div>
    </Link>
  )
}

export default Product
