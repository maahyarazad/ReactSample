import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../ServiceCard/ServiceCard";
import './ServiceGrid.css';
const ServiceGrid = ({ containerTitle, serviceKeyName, gridClass }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SITE_DATA)
            .then((response) => {

                setServices(response.data[serviceKeyName]);
                console.log(serviceKeyName)
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load services.");
                setLoading(false);
            });
    }, [serviceKeyName]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="py-4 text-center service-grid-title">
                {containerTitle.split(" ")[0]}{" "}
                <span className="highlighted-word">{containerTitle.split(" ")[1]}</span>{" "}
                {containerTitle.split(" ").slice(2).join(" ")}
            </h2>
            <div className="row">
                {services.map((service, index) => (
                    <div className={gridClass} key={index}>
                        <ServiceCard {...service} />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ServiceGrid;
