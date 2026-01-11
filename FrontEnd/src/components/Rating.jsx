import React, { useState } from 'react'
import '../componentStyles/Rating.css'

function Rating({value, onRating, disabled}) {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0);

    // Handle star hover
    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoverRating(rating);
        }
    }

    // Mouse leave
    const handleMouseLeave = () => {
        if (!disabled) {
            setHoverRating(0);
        }
    }

    // Handle CLick
    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating);
            if(onRating){
                onRating(rating);
            }
        }
    }

    // Function to generate stars on based on rating
    const generateStars = () => {
        const stars = [];
        for(let i = 1 ; i <= 5 ; i++){
            const isFilled = i <= (hoverRating || selectedRating);
            stars.push(
                <span key={i} className={`stars ${isFilled ? 'filled' : 'empty'}`}
                onMouseEnter={() => handleMouseEnter}
                onMouseLeave={() => handleMouseLeave}
                onClick={() => handleClick}
                style={{pointerEvents:disabled ? 'none' : 'auto'}}>★</span>
                
            )
        }
        return stars;
    }

  return (
    <div>
      <div className="rating">{generateStars()}</div>
    </div>
  )
}

export default Rating
