import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './Pages/About';

import Navbar from './Components/Navbar/Navbar';
import BackToTop from './Components/BackToTop/BackToTop';

import Services from './Pages/Services';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticleJsContainer from './Components/ParticleJsContainer/ParticleJsContainer';
const App = () => {

  const handleLanguageChange = (value) => {
    console.log(value);
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

      <Navbar onLanguageChange={handleLanguageChange} />
      <ParticleJsContainer></ParticleJsContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
