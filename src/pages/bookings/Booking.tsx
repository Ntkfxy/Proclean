import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import cleaningService from "../../service/cleaning.service";
import bookingService from "../../service/booking.service";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import BookingForm from "../../components/BookingForm";
import Card from "../../components/Card";
import { Service, BookingData } from "../../types";

const Booking: React.FC = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get("serviceId") || "";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to book a service.",
        icon: "info",
      }).then(() => navigate("/login"));
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await cleaningService.getAllServices();
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        Swal.fire("Error", "Could not load services.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [userInfo, navigate]);

  const handleBookingSubmit = async (formData: BookingData) => {
    if (!userInfo) return;
    setIsSubmitting(true);
    try {
      const bookingData: BookingData = {
        ...formData,
        userId: userInfo.id || userInfo._id,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      
      const response = await bookingService.createBooking(bookingData);
      
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Booking Successful!",
          text: "Your service has been scheduled. We will contact you shortly.",
          icon: "success",
        }).then(() => navigate("/my-bookings"));
      }
    } catch (error: any) {
      Swal.fire("Booking Failed", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">Book a Service</h1>
        <p className="text-base-content/60">Fill in the details below to schedule your cleaning.</p>
      </div>

      <Card>
        <BookingForm 
          services={services} 
          initialData={{ serviceId: initialServiceId }} 
          onSubmit={handleBookingSubmit} 
          isSubmitting={isSubmitting} 
        />
      </Card>
    </div>
  );
};

export default Booking;
