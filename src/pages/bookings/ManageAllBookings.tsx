import React, { useState, useEffect } from "react";
import bookingService from "../../service/booking.service";
import cleaningService from "../../service/cleaning.service";
import Swal from "sweetalert2";
import { BookingData, Service } from "../../types";
import Button from "../../components/Button";

const ManageAllBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [services, setServices] = useState<Record<string | number, Service>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        bookingService.getAllBookings(),
        cleaningService.getAllServices()
      ]);

      if (bookingsRes.status === 200 && servicesRes.status === 200) {
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
    } catch (error: any) {
      Swal.fire("Error", "Could not load data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (booking: BookingData, newStatus: string) => {
    const bookingId = booking._id || booking.id;
    if (!bookingId) return;
    try {
      await bookingService.updateBooking(bookingId, { ...booking, status: newStatus });
      Swal.fire("Updated", `Status updated to ${newStatus}`, "success");
      fetchData();
    } catch (error: any) {
      Swal.fire("Error", "Could not update status.", "error");
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
      <h1 className="text-3xl font-bold mb-8">Manage All Bookings</h1>

      <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-300 shadow-sm">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const bId = booking._id || booking.id;
                return (
                  <tr key={bId}>
                    <td>#{bId}</td>
                    <td>{booking.userId}</td>
                    <td>{services[booking.serviceId]?.name || "Unknown"}</td>
                    <td>
                      <div>{booking.date}</div>
                      <div className="text-xs opacity-50">{booking.time}</div>
                    </td>
                    <td>
                      <span className={`badge ${
                        booking.status === 'Pending' ? 'badge-warning' : 
                        booking.status === 'Completed' ? 'badge-success' : 'badge-error'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="btn-xs"
                        onClick={() => handleUpdateStatus(booking, 'Completed')}
                        disabled={booking.status === 'Completed'}
                      >
                        Complete
                      </Button>
                      <Button 
                        variant="danger" 
                        className="btn-xs"
                        onClick={() => handleUpdateStatus(booking, 'Cancelled')}
                        disabled={booking.status === 'Cancelled' || booking.status === 'Completed'}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 opacity-50">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllBookings;
