import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './Pages/About';

import Navbar from './Components/Navbar/Navbar';
import BackToTop from './Components/BackToTop/BackToTop';

import Services from './Pages/Services';
import Footer from './Components/Footer/Footer';

const App = () => {

  const handleLanguageChange = (value) => {
    console.log(value);
  }

  return (

    <BrowserRouter>
      <Navbar onLanguageChange={handleLanguageChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer/>
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
