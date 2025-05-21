
import "./ServiceCard.css";
import { FaCheck } from "react-icons/fa";
import { forwardRef, useEffect, useRef, useState } from 'react';


const ServiceCard = forwardRef(({
    href,
    imageSrc,
    imageAlt,
    title,
    description,
    services,
    linkText,
    showServicesList = true,
    clickable = false,
    hoverEffect = false,
    className = ''
}, ref) => {


    const hoverClass = hoverEffect ? "iot-card--hover" : "";


    return (
        <div ref={ref} className={`cart-container ${className}` }>
            {clickable ? (
                <a href={href} className={`iot-card ${hoverClass}`} >
                    <div className="iot-card__image">
                        <img src={imageSrc} alt={imageAlt} width={56} height={56} />
                    </div>

                    <h4
                        className={`iot-card__title}`}>
                        {title}
                    </h4>

                    <div className="iot-card__text">
                        <p>{description}</p>
                        {showServicesList && services?.length > 0 && (
                            <ul className="iot-card__list">
                                {services.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <a href={href} className="iot-card__link">
                        {linkText}
                        <span>→</span>
                    </a>
                </a>
            ) : (
                <div className={`iot-card ${hoverClass}`}>
                    <div className="iot-card__image">
                        <img src={imageSrc} alt={imageAlt} width={56} height={56} />
                    </div>
                    <h4 className="iot-card__title">{title}</h4>
                    <div className="iot-card__text">
                        <p>{description}</p>
                        {showServicesList && services?.length > 0 && (
                            <ul className="iot-card__list">
                                {services.map((service, index) => (
                                    <div className="d-block flex-grow-1" key={index}>
                                        <li>
                                            <FaCheck className="check-icon" /> {service}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                    {
                        !linkText?.trim() ? (

                            <></>
                        ) : (

                            <a href={href} className="iot-card__link">
                                {linkText}
                                <span>→</span>
                            </a>
                        )
                    }



                </div>
            )}
        </div>
    );
});

export default ServiceCard;
