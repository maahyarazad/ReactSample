// HomeSlider.jsx
import React, { forwardRef } from 'react';
import './HomeSlider.css';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomeSlider = forwardRef(({ id, title, text, image }, ref) => {
    return (
        <div ref={ref} id={id} className="home-slider">
            <LazyLoadImage
                src={image}
                alt={title}
                placeholderSrc={image}
                className="slider-image"
            />
            <div className="slider-content">
                <h1 className="slider-title">{title}</h1>
                <p className="slider-text">{text}</p>
                <button className="get-started-button" onClick={() => toast.info("This application is under development!")}>Get Started</button>
            </div>
        </div>
    );
});

export default HomeSlider;
