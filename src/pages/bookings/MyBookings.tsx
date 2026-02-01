import React, { useState, useEffect, useContext } from "react";
import bookingService from "../../service/booking.service";
import cleaningService from "../../service/cleaning.service";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { BookingData, Service } from "../../types";

const MyBookings: React.FC = () => {
  const { userInfo } = useContext(UserContext);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [services, setServices] = useState<Record<string | number, Service>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const uId = userInfo?.id || userInfo?._id;
      if (!uId) return;
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          bookingService.getBookingsByUser(uId.toString()),
          cleaningService.getAllServices()
        ]);

        if (bookingsRes.status === 200 && servicesRes.status === 200) {
          // Map services for easy lookup
          const serviceMap: Record<string | number, Service> = {};
          servicesRes.data.forEach(s => {
            const sId = s._id || s.id;
            if (sId) serviceMap[sId] = s;
          });
          setServices(serviceMap);

          setBookings(bookingsRes.data.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }));
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleCancelBooking = async (id: number | string | undefined) => {
    if (id === undefined) return;
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it"
    });

    if (result.isConfirmed) {
      try {
        await bookingService.deleteBooking(id);
        setBookings(bookings.filter(b => b.id !== id));
        Swal.fire("Cancelled", "Your booking has been cancelled.", "success");
      } catch (error) {
        Swal.fire("Error", "Could not cancel booking.", "error");
      }
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const bId = booking._id || booking.id;
            const service = services[booking.serviceId];
            return (
              <Card key={bId} title={service?.name || "Service"}>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold text-base-content/60">Date:</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base-content/60">Time:</span>
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base-content/60">Status:</span>
                    <span className={`badge ${booking.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="divider my-1"></div>
                  <div>
                    <span className="font-semibold text-base-content/60 block mb-1">Address:</span>
                    <p className="bg-base-200 p-2 rounded text-xs">{booking.address}</p>
                  </div>
                </div>
                <div className="card-actions mt-6">
                  <Button 
                    variant="danger" 
                    fullWidth 
                    onClick={() => handleCancelBooking(bId)}
                    disabled={booking.status === 'Completed'}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300">
          <h2 className="text-2xl font-semibold text-base-content/50 mb-4">You have no bookings yet.</h2>
          <Button onClick={() => window.location.href = '/book'}>Book Your First Service</Button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
