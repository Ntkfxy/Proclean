import { Service, ServiceDTO } from "../types";

export const toServiceDTO = (service: Service): ServiceDTO => {
  return {
    name: service.name,
    details: service.description,
    price: service.price,
    coverImageUrl: service.image,
    duration: service.duration,
  };
};

export const fromServiceDTO = (dto: any): Service => {
  return {
    id: dto._id || dto.id,
    _id: dto._id,
    name: dto.name,
    description: dto.details,
    price: dto.price,
    image: dto.coverImageUrl,
    duration: dto.duration,
  };
};
