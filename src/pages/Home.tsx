import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import cleaningService from "../service/cleaning.service";
import Swal from "sweetalert2";
import { Service } from "../types";

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await cleaningService.getAllServices();
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Could not fetch services. Please try again later.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-base-content">
          Professional Cleaning Services
        </h1>
        <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
          Choose the best service for your home. We provide top-quality cleaning with professional staff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service) => {
            const serviceId = service._id || service.id;
            return <ServiceCard key={serviceId} {...service} id={serviceId} />;
          })
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold text-base-content/50">No services available at the moment.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
