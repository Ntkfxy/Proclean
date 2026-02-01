import React from "react";
import { Link } from "react-router-dom";
import { Service } from "../types";

const ServiceCard: React.FC<Service> = ({
  id,
  _id,
  name,
  description,
  price,
  image,
  duration,
}) => {
  const serviceId = id || _id;
  if (!serviceId) return null;

  return (
    <Link to={`/service/${serviceId}`} className="block">
      <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all overflow-hidden group cursor-pointer">
        <figure className="relative h-48 sm:h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-service.jpg";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-content px-3 py-1 rounded-full font-bold shadow-lg">
            ฿{price}
          </div>
        </figure>

        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-bold">{name}</h2>

          {duration && (
            <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
              <span className="badge badge-outline">{duration}</span>
            </div>
          )}

          <p className="text-base-content/70 line-clamp-2 mb-4">
            {description}
          </p>

        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
