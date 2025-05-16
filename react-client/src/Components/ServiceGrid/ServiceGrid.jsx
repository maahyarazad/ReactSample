
import ServiceCard from "../ServiceCard/ServiceCard";
import './ServiceGrid.css';
const ServiceGrid = ({ data, containerTitle, serviceKeyName, gridClass }) => {

    if (!data) return null;

    return (
        <div className="p-0 p-md-4">
            <h2 className="py-4 text-center service-grid-title">
                {containerTitle.split(" ")[0]}{" "}
                <span className="highlighted-word">{containerTitle.split(" ")[1]}</span>{" "}
                {containerTitle.split(" ").slice(2).join(" ")}
            </h2>
            <div className="row">
                {data.map((service, index) => (
                    <div className={gridClass} key={index}>
                        <ServiceCard {...service} />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ServiceGrid;
