import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../ServiceCard/ServiceCard";

const ServiceGrid = ({serviceKeyName, gridClass}) => {
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
        <div className="row">
            {services.map((service, index) => (
                <div className={gridClass} key={index}>
                    <ServiceCard {...service} />
                </div>
            ))}
        </div>
    );

};

export default ServiceGrid;
