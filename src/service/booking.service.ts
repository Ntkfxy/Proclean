import { AxiosResponse } from "axios";
import api from "./api";
import { BookingData } from "../types";

const API_URL = import.meta.env.VITE_BOOKING_API;

// GET ALL BOOKINGS
const getAllBookings = async (): Promise<AxiosResponse<BookingData[]>> => {
  return await api.get(API_URL);
};

// GET BOOKING BY ID
const getBookingById = async (id: string | number): Promise<AxiosResponse<BookingData>> => {
  return await api.get(`${API_URL}/${id}`);
};

// GET BOOKINGS BY USER
const getBookingsByUser = async (username: string): Promise<AxiosResponse<BookingData[]>> => {
  return await api.get(`${API_URL}/user/${username}`);
};

// CREATE BOOKING
const createBooking = async (bookingData: BookingData): Promise<AxiosResponse<BookingData>> => {
  return await api.post(API_URL, bookingData);
};

// UPDATE BOOKING
const updateBooking = async (id: string | number, bookingData: BookingData): Promise<AxiosResponse<BookingData>> => {
  return await api.put(`${API_URL}/${id}`, bookingData);
};

// DELETE BOOKING
const deleteBooking = async (id: string | number): Promise<AxiosResponse<void>> => {
  return await api.delete(`${API_URL}/${id}`);
};

const bookingService = {
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  createBooking,
  updateBooking,
  deleteBooking,
};

export default bookingService;
