import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import { Service, BookingData } from "../types";

interface BookingFormProps {
  initialData?: Partial<BookingData>;
  onSubmit: (data: BookingData) => void;
  isSubmitting?: boolean;
  services?: Service[];
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  isSubmitting = false, 
  services = [] 
}) => {
  const [formData, setFormData] = useState<BookingData>({
    serviceId: "",
    date: "",
    time: "",
    address: "",
    note: "",
    ...initialData,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Select Service</span>
        </label>
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="select select-bordered w-full bg-base-100"
          required
        >
          <option value="" disabled>Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ฿{service.price}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Preferred Date</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Preferred Time</span>
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100"
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Address</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your full address"
          className="textarea textarea-bordered w-full bg-base-100 min-h-[100px]"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Special Instructions (Optional)</span>
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Any specific requests?"
          className="textarea textarea-bordered w-full bg-base-100"
        />
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : initialData.id ? "Update Booking" : "Confirm Booking"}
      </Button>
    </form>
  );
};

export default BookingForm;
