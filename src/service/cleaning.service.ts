import { AxiosResponse } from "axios";
import api from "./api";
import { Service, ServiceDTO } from "../types";

const API_URL = import.meta.env.VITE_SERVICE_API;

// ---------- MAPPERS ----------
const fromDTO = (dto: any): Service => ({
  id: dto._id,
  _id: dto._id,
  name: dto.name,
  description: dto.details,
  price: dto.price,
  image: dto.coverImageUrl,
  duration: dto.duration || "",
});

// ---------- API METHODS ----------

// GET ALL SERVICES
const getAllServices = async (): Promise<AxiosResponse<Service[]>> => {
  const res = await api.get<ServiceDTO[]>(API_URL);
  return { ...res, data: res.data.map(fromDTO) };
};

// GET SERVICE BY ID
const getServiceById = async (id: string | number): Promise<AxiosResponse<Service>> => {
  const res = await api.get<ServiceDTO>(`${API_URL}/${id}`);
  return { ...res, data: fromDTO(res.data) };
};

// CREATE SERVICE (รองรับ FormData)
// CREATE SERVICE (รองรับ FormData)
const createService = async (
  serviceData: Service | FormData
): Promise<AxiosResponse<Service>> => {
  let res: AxiosResponse<ServiceDTO>;

  if (serviceData instanceof FormData) {
    // ส่ง FormData สำหรับ upload รูป
    res = await api.post<ServiceDTO>(API_URL, serviceData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    // ส่ง JSON ปกติ
    const dto = {
      name: serviceData.name,
      details: serviceData.description,
      price: serviceData.price,
      coverImageUrl: serviceData.image,
      duration: serviceData.duration,
    };
    res = await api.post<ServiceDTO>(API_URL, dto);
  }

  return { ...res, data: fromDTO(res.data) };
};


// UPDATE SERVICE (รองรับ FormData)
const updateService = async (
  id: string | number,
  serviceData: Partial<Service> | FormData
): Promise<AxiosResponse<Service>> => {
  let res: AxiosResponse<ServiceDTO>;

  if (serviceData instanceof FormData) {
    res = await api.put<ServiceDTO>(`${API_URL}/${id}`, serviceData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    const dto = {
      name: serviceData.name,
      details: serviceData.description,
      price: serviceData.price,
      coverImageUrl: serviceData.image,
      duration: serviceData.duration,
    };
    res = await api.put<ServiceDTO>(`${API_URL}/${id}`, dto);
  }

  return { ...res, data: fromDTO(res.data) };
};

// DELETE SERVICE
const deleteService = async (id: string | number): Promise<AxiosResponse<void>> => {
  return api.delete(`${API_URL}/${id}`);
};



const cleaningService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};

export default cleaningService;
