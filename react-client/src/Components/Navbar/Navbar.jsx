import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { toast } from 'react-toastify';
// React Component
import Burger from '@animated-burgers/burger-rotate'
// don't forget the styles
import '@animated-burgers/burger-rotate/dist/styles.css'
import logo from '../../Assets/palmx-logo.jpeg'


const Navbar = ({ companyName, navbarLinks, onLanguageChange, currentlanguage }) => {

    gsap.registerPlugin(ScrollToPlugin);

    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState(currentlanguage);
    const [scrolled, setScrolled] = useState(false);

    // Toggle the mobile menu
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const GetStarted = (e) => {
        var element = document.querySelector("section.request-form-section");
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });

            const menu = document.querySelector(".mobile-menu.open");

            if (menu) {
                // menu.classList.remove("open");
                setMenuOpen(false);
            }
        }
    }



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

    useEffect(() => { }, [companyName, navbarLinks]);



    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    if (!navbarLinks || !companyName) return null

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-section-left">
                <div className="logo-container-header">
                    {/* {companyName && companyName} */}
                    <img src={logo} alt="Company Logo" className="header-logo" />
                </div>
            </div>

            <div className="navbar-section-middle">

                <button className={`menu-toggle ${scrolled ? 'scrolled' : ''}`} aria-label="Toggle menu">
                    <Burger isOpen={menuOpen} direction="right" onClick={toggleMenu}>

                    </Burger>
                </button>



                {/* Desktop Nav Links */}
                <ul className="navbar-links desktop-only">
                    {navbarLinks?.map((link) => (
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
                <button className="btn btn-primary-contrast" onClick={GetStarted} type="button">Get Started Now!</button>
            </div>

            {/* Slide-out Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}>
                <ul className="mobile-links">
                    {navbarLinks?.map((link) => (
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
                <button
                    type="button"
                    className="get-started mobile"
                    onClick={GetStarted}
                >
                    Get Started Now!
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
