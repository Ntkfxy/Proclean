import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import cleaningService from "../../service/cleaning.service";
import Swal from "sweetalert2";
import { Service } from "../../types";
import Button from "../../components/Button";
import Card from "../../components/Card";

const ManageServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // --------------------
  // Fetch
  // --------------------
  const fetchServices = async () => {
    try {
      const response = await cleaningService.getAllServices();
      setServices(response.data || []);
    } catch (error: any) {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        error?.response?.data?.message || "ไม่สามารถโหลดรายการบริการได้",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --------------------
  // Search filter
  // --------------------
  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  // --------------------
  // Delete
  // --------------------
  const handleDelete = async (id?: string | number) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณต้องการลบบริการนี้หรือไม่? การลบไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await cleaningService.deleteService(id);
      Swal.fire("สำเร็จ", "ลบบริการเรียบร้อยแล้ว", "success");
      fetchServices();
    } catch (error: any) {
      Swal.fire(
        "ผิดพลาด",
        error?.response?.data?.message || "ไม่สามารถลบบริการได้",
        "error"
      );
    }
  };

  // --------------------
  // Loading
  // --------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // --------------------
  // UI
  // --------------------
  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              จัดการบริการทำความสะอาด
            </h1>
            <p className="text-base-content/60">
              เพิ่ม แก้ไข และลบบริการในระบบ
            </p>
          </div>

          <Link to="/add-service">
            <Button variant="primary">
              + เพิ่มบริการใหม่
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <input
            type="text"
            placeholder="ค้นหาชื่อบริการ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-base-content/60">
            <p className="text-lg font-semibold mb-2">
              ยังไม่มีบริการในระบบ
            </p>
            <p>กดปุ่ม “เพิ่มบริการใหม่” เพื่อเริ่มต้น</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const serviceId = service._id || service.id;

            return (
              <Card
                key={serviceId}
                title={service.name}
                className="hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                {service.image && (
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                  {service.description}
                </p>

                {/* Price */}
                <div className="flex justify-between items-center mb-4">
                  <span className="badge badge-primary badge-lg">
                    ฿{service.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Link to={`/edit-service/${serviceId}`}>
                    <Button variant="outline" className="btn-sm">
                      แก้ไข
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(serviceId)}
                  >
                    ลบ
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
