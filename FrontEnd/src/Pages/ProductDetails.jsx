import React, { useState } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Navbar from '../components/NavBar'
import Rating from '@mui/material/Rating'

function ProductDetails() {
    const [userRating,setuserRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setuserRating(newRating); 
        };
  return (
    <>
    <PageTitle title="Product Details"/>
    <Navbar />
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src="" alt="Product" className="product-detail-image"/>
            </div>

            <div className="product-info">
                <h2>Product Name</h2>
                <p className="product-description">Prodcut Description</p>
                <p className="product-price">Price: $99.99</p>
                <br />
                <div className='product-rating'>
                    <Rating 
                    value={2}
                    disabled={true}
                    />
                    <br />
                    <span className="productCardSpan">(2 Reviews)</span>
                </div>
                <br />
                <div className="stock-status">
                    <span className="in-stock">
                        In Stock
                    </span>
                </div>

                <div className="quantity-controls">
                    <span className="quantity-label">
                        <button className="quantity-button">
                            -
                        </button>
                        <input type="text" value={1} readOnly className="quantity-value" />
                        <button className="quantity-button">
                            +
                        </button>
                    </span>
                </div>
                <button className="add-to-cart-btn">
                    Add to Cart
                </button>
                <form className="review-form">
                    <h3>Write a Review</h3>
                    <Rating value={0} disabled={false} onRatingChange={handleRatingChange} />
                    <br />
                    <textarea placeholder='Write Your review here'
                    className="review-input"></textarea>
                    <button className="submit-review-btn">Submit Review</button>
                </form>
            </div>
        </div>

        <div className='reviews-container'>
            <h3>Customer-Reviews</h3>
            <div className="reviews-section">
                <div className="review-item">
                    <div className="review-header">
                        <Rating value={1} disabled={true} />
                    </div>
                    <p className="review-comment">Review comment</p>
                    <p className="review-name">Reviewer Name</p>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails
