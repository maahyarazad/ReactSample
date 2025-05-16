import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { toast } from 'react-toastify';
// React Component
import Burger from '@animated-burgers/burger-rotate' 
// don't forget the styles
import '@animated-burgers/burger-rotate/dist/styles.css' 

const Navbar = ({ onLanguageChange }) => {

    gsap.registerPlugin(ScrollToPlugin);

    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // Toggle the mobile menu
    const toggleMenu = () => setMenuOpen(!menuOpen);




    // Switch language function
    const switchLanguage = () => {
        const newLang = language === 'EN' ? 'DE' : 'EN';
        setLanguage(newLang);

        if (onLanguageChange) {
            onLanguageChange(newLang);
        }
    };

    const handleScroll = (key) => {

        const targetElement = document.getElementById(`home-slide-${key}`);

        console.log(targetElement);

        if (targetElement) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: targetElement, offsetY: 80 },
                ease: 'power2.out'
            });
        } else {
            console.error('Element not found for key:', key);
        }
    };



    useEffect(() => {
        axios.get(process.env.REACT_APP_SITE_DATA)
            .then((response) => {
                setCompanyData(response.data);
                setLoading(false);


            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            });
    }, []);

    useEffect(()=>{
        const onScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])


    if (loading) {
        return <div>Loading...</div>;
    }

    // Todo Use FunctionalErrorBoundry
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-section-left">
                <div className="navbar-logo">
                    {companyData && companyData.companyName}
                </div>
            </div>

            <div className="navbar-section-middle">

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <FaBars size={24} color="#333" />
                </button>

                {/* <Burger isOpen={menuOpen} direction="right">

                </Burger> */}

                {/* Desktop Nav Links */}
                <ul className="navbar-links desktop-only">
                    {companyData?.navLinks?.map((link) => (
                        <li key={link.path}>
                            {/* <Link to={link.path}>{link.label}</Link> */}

                            <Link onClick={() => handleScroll(link.id)}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-section-right desktop-only">
                <div className="lang-switch">
                    <label className="switch">
                        <input type="checkbox" onChange={switchLanguage} checked={language === 'DE'} />
                        <span className="slider" />
                    </label>
                    <span className="lang-label">{language}</span>
                </div>
                <button className="get-started" onClick={() => toast.info("This application is under development!")} type="button">Get Started Now!</button>
            </div>

            {/* Slide-out Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleMenu} aria-label="Close menu">
                    <FaTimes size={28} color="#333" />
                </button>
                <ul className="mobile-links">
                    {companyData?.navLinks?.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path} onClick={toggleMenu}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="mobile-lang-switch">
                    <label className="switch">
                        <input type="checkbox" onChange={switchLanguage} checked={language === 'DE'} />
                        <span className="slider" />
                    </label>
                    <span className="lang-label">{language}</span>
                </div>
                <button type="button"
                    className="get-started mobile" onClick={() => toast.info("This application is under development!")}>Get Started Now!</button>
            </div>
        </nav>
    );
};

export default Navbar;
