import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import cleaningService from "../../service/cleaning.service";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { Service } from "../../types";

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const response = await cleaningService.getServiceById(id);
        setService(response.data);
      } catch {
        Swal.fire("Error", "ไม่สามารถโหลดรายละเอียดบริการได้", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          ไม่พบบริการนี้ในระบบ
        </h2>
        <Link to="/" className="btn btn-primary mt-4">
          กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  const serviceId = service.id || service._id;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="container mx-auto max-w-5xl">
        <Card
          image={service.image}
          title="รายละเอียดบริการ"
          className="bg-base-100"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold break-words">
                {service.name}
              </h1>

              {service.duration && (
                <div className="badge badge-primary mt-2">
                  {service.duration}
                </div>
              )}
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              ฿{service.price}
            </div>
          </div>

          <div className="divider" />

          {/* Description */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold italic">
              รายละเอียดบริการ
            </h3>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-base-content/80">
              {service.description}
            </p>
          </section>

          {/* Highlight Section */}
          <section className="mt-8 bg-base-200 p-4 sm:p-6 rounded-2xl border border-base-300">
            <h3 className="text-lg font-bold mb-3">
              ทำไมต้องเลือกบริการนี้?
            </h3>

            <ul className="list-disc list-inside space-y-2 text-base-content/70 text-sm sm:text-base">
              <li>ทีมงานมืออาชีพ ผ่านการตรวจสอบประวัติ</li>
              <li>ใช้น้ำยาทำความสะอาดที่เป็นมิตรต่อสิ่งแวดล้อม</li>
              <li>รับประกันความพึงพอใจ หรือทำความสะอาดใหม่ฟรี</li>
              <li>เลือกวันและเวลานัดหมายได้อย่างยืดหยุ่น</li>
            </ul>
          </section>

          {/* Actions */}
          <div className="card-actions mt-10 flex flex-col md:flex-row gap-3">
            <Link
              to={`/book?serviceId=${serviceId}`}
              className="w-full md:w-auto flex-1"
            >
              <Button fullWidth className="text-base md:text-lg py-3 md:py-4">
                จองบริการนี้ทันที
              </Button>
            </Link>

            <Link
              to="/"
              className="btn btn-ghost btn-block md:w-auto"
            >
              กลับไปหน้ารายการบริการ
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetail;
