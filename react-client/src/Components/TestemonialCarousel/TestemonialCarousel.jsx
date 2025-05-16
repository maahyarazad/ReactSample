import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel styles
import './TestemonialCarousel.css';

const TestimonialCarousel = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SITE_DATA)
            .then((response) => {
                setTestimonials(response.data.testimonials);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load testimonials.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Loop through slides
        speed: 500, // Transition speed in ms
        slidesToShow: 1, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll per navigation
        draggable: true, // Enable drag feature
        touchThreshold: 10, // Touch sensitivity for swipe
        autoplay: true, // Enable auto change
        autoplaySpeed: 99999999, // Time between slide transitions in ms (3 seconds)
        arrows: false,
        //  prevArrow: (
        //     <div className="custom-arrow prev-arrow">
        //         <span>←</span>
        //     </div>
        // ), 
        // nextArrow: (
        //     <div className="custom-arrow next-arrow">
        //         <span>→</span>
        //     </div>
        // ),
        responsive: [
            {
                breakpoint: 768, // Change slides visible for smaller screen sizes
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };


    return (
        <Slider {...settings}> {/* Use Slider component from react-slick */}
            {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-slide">
                    <div className="testimonial-left-content">
                        <div className="testimonial-review-text">
                            <p className="testimonial-paragraph">{testimonial.review}</p>
                            <p className="testimonial-paragraph">{testimonial.additionalInfo}</p>
                        </div>
                    </div>
                    <div className="testimonial-right-content">
                        <div className="testimonial-author-data">
                            <img
                                loading="lazy"
                                src={testimonial.authorImage}
                                alt="Customer"
                                className="testimonial-author-photo"
                            />
                            <div className="testimonial-author-text">
                                <div className="testimonial-author-name">{testimonial.authorName}</div>
                                <div className="testimonial-author-position">{testimonial.authorPosition}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default TestimonialCarousel;
