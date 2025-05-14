import React, { useState, useEffect, useRef } from 'react';
import HomeSlider from './Components/HomeSlider/HomeSlider';
import ServiceGrid from './Components/ServiceGrid/ServiceGrid';
import axios from 'axios';
import gsap from 'gsap'

const Home = () => {
    const [homeSliders, setHomeSliders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const sliderRefs = useRef([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SITE_DATA)
            .then((response) => {
                console.log(response)
                setHomeSliders(response.data.homeSliders);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);


    // Observe AFTER the sliders are rendered
    useEffect(() => {
        if (!homeSliders.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;

                        // Animate title from left
                        const title = el.querySelector('.slider-title');
                        gsap.fromTo(title,
                            { x: -100, opacity: 0 },
                            { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
                        );

                        // Animate text from right
                        const text = el.querySelector('.slider-text');
                        gsap.fromTo(text,
                            { x: 100, opacity: 0 },
                            { x: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
                        );

                        const button = el.querySelector('.get-started-button');
                        gsap.fromTo(button,
                            { y: -100, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
                        );

                        observer.unobserve(el); // run once

                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            },
            { threshold: 0.5 }
        );

        sliderRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            sliderRefs.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [homeSliders]);


    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //   return <div>{error}</div>;
    // }

    return (
        <>
            {homeSliders.map((slider) => (
                <HomeSlider
                    key={slider.id}
                    id={`home-slide-${slider.id}`}
                    title={slider.title}
                    text={slider.text}
                    image={slider.image}
                    ref={(el) => (sliderRefs.current[slider.id - 1] = el)}
                />
            ))}

            <div className="container mx-auto px-4 py-8">
                <ServiceGrid 
                    containerTitle={"Industries we help"}
                    serviceKeyName={"serviceCards_1"} 
                    gridClass={"col-12 col-sm-6 col-lg-4 mb-4"} />
            </div>

            <div className="container mx-auto px-4 py-8">
                <ServiceGrid 
                    containerTitle={"Advanced tech we work with"}
                    serviceKeyName={"serviceCards_2"} 
                    gridClass={"col-12 col-sm-6 col-lg-6 mb-4"} />
            </div>
        </>
    );
};

export default Home;
