
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './Pages/About';

import Navbar from './Components/Navbar/Navbar';
import BackToTop from './Components/BackToTop/BackToTop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Services from './Pages/Services';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticleJsContainer from './Components/ParticleJsContainer/ParticleJsContainer';
const App = () => {
    const [siteData, setSiteData] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SITE_DATA)
            .then((response) => {
                setSiteData(response.data);

            })
            .catch((error) => {
                console.error('Error fetching footer data:', error);
            });
    }, []);

    useEffect(() => {

        console.log('siteData updated:', siteData);
    }, [siteData]);


    const handleLanguageChange = (value) => {
        console.log(value);
    }

    if (!siteData) {
        return <div>Loading blueprint...</div>;
    }


    return (
        <BrowserRouter>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Navbar onLanguageChange={handleLanguageChange} 
                navbarLinks={siteData.navLinks} 
                companyName={siteData.companyName}/>
            <ParticleJsContainer></ParticleJsContainer>
            <Routes>
                <Route path="/" element={<Home siteData={siteData}/>} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
            </Routes>
            <Footer footerData={siteData.footer} />
            <BackToTop />
        </BrowserRouter>
    );

};

export default App;
