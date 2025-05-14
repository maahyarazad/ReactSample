// HomeSlider.jsx
import React, { forwardRef } from 'react';
import './HomeSlider.css';

const HomeSlider = forwardRef(({ id, title, text, image }, ref) => {
    return (
        <div ref={ref} id={id} className="home-slider">
            <img src={image} alt={title} className="slider-image" loading="lazy" />
            <div className="slider-content">
                <h1 className="slider-title">{title}</h1>
                <p className="slider-text">{text}</p>
                <button className="get-started-button">Get Started</button>
            </div>
        </div>
    );
});

export default HomeSlider;
