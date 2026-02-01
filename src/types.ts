export interface Service {
  id?: string | number;
  _id?: string | number;

  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
}


export interface ServiceDTO {
  name: string;
  details: string;
  price: number;
  coverImageUrl: string;
  duration: string; // ✅ เพิ่ม
}



export interface BookingData {
  id?: string | number;
  _id?: string | number;
  serviceId: string | number;
  date: string;
  time: string;
  address: string;
  note?: string;
  userId?: string | number;
  status?: string;
  createdAt?: string;
}

export interface UserInfo {
  id?: string | number;
  _id?: string | number;
  username: string;
  role: "User" | "Author";
  accessToken?: string;
}
