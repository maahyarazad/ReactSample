import React, { useEffect } from 'react';
import HomeSlider from './Components/HomeSlider/HomeSlider';
import ServiceGrid from './Components/ServiceGrid/ServiceGrid';
import gsap from 'gsap'
import TestimonialCarousel from './Components/TestemonialCarousel/TestemonialCarousel';
import ContactUsForm from './Components/ContactUsForm/ContactUsForm'
import TypeWriter from './Components/TypeWriter/TypeWriter';


const Home = ({ siteData }) => {

    useEffect(() => { }, [siteData]);

    if (!siteData) return null;

    return (
        <>

            {/* {homeSliders.map((slider) => (
                <HomeSlider
                    key={slider.id}
                    id={`home-slide-${slider.id}`}
                    title={slider.title}
                    text={slider.text}
                    image={slider.image}
                    ref={(el) => (sliderRefs.current[slider.id - 1] = el)}
                />
            ))} */}

            <TypeWriter />

            <div className="container mx-auto px-4 py-8">
                <ServiceGrid
                    data={siteData.serviceCards_1}
                    containerTitle={"Industries we help"}
                    serviceKeyName={"serviceCards_1"}
                    gridClass={"col-12 col-sm-6 col-lg-4 mb-4"} />
            </div>

            <div className="container mx-auto px-4 py-8">
                <TestimonialCarousel data={siteData.testimonials}/>
            </div>

            <div className="container mx-auto px-4 py-8">
                <ServiceGrid
                    data={siteData.serviceCards_2}
                    containerTitle={"Advanced tech we work with"}
                    serviceKeyName={"serviceCards_2"}
                    gridClass={"col-12 col-sm-6 col-lg-6 mb-4"} />
            </div>

            <ContactUsForm />
        </>
    );
};

export default Home;
