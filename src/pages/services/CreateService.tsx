import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import cleaningService from "../../service/cleaning.service";
import Swal from "sweetalert2";
import Card from "../../components/Card";
import api from "../../service/api";

interface CreateServiceForm {
  name: string;
  details: string;
  price: number;
  coverImageUrl: string;
  duration: string;
}

const CreateService: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateServiceForm>({
    name: "",
    details: "",
    price: 0,
    coverImageUrl: "",
    duration: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // -------------------
  // Handlers
  // -------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // -------------------
  // Validation
  // -------------------
  const validateForm = () => {
    if (!formData.name.trim()) return "กรุณากรอกชื่อบริการ";
    if (!formData.details.trim()) return "กรุณากรอกรายละเอียดบริการ";
    if (!formData.duration.trim()) return "กรุณากรอกระยะเวลาให้บริการ";
    if (formData.price <= 0) return "ราคาต้องมากกว่า 0";
    if (!imageFile) return "กรุณาอัปโหลดรูปภาพ";

    return null;
  };

  // -------------------
  // Submit
  // -------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
    form.append("name", formData.name);
    form.append("details", formData.details);
    form.append("price", String(formData.price));
    form.append("duration", formData.duration);

    if (imageFile) {
      form.append("file", imageFile);
    }

    await cleaningService.createService(form);

    Swal.fire("สำเร็จ", "เพิ่มบริการเรียบร้อยแล้ว", "success");
    navigate("/manage-services");
  } catch (error: any) {
    Swal.fire(
      "ผิดพลาด",
      error?.response?.data?.message || "ไม่สามารถเพิ่มบริการได้",
      "error"
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // -------------------
  // UI
  // -------------------
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl">
        <Card title="เพิ่มบริการใหม่">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {formError && (
              <div className="alert alert-error">
                <span>{formError}</span>
              </div>
            )}

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ชื่อบริการ</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="เช่น ทำความสะอาดบ้านทั้งหลัง"
                className="input input-bordered w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  รายละเอียดบริการ
                </span>
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="อธิบายขอบเขตงาน"
                className="textarea textarea-bordered w-full min-h-[120px]"
                disabled={isSubmitting}
              />
            </div>

            {/* Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  ระยะเวลาให้บริการ
                </span>
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="เช่น 2 ชั่วโมง"
                className="input input-bordered w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  ราคา (บาท)
                </span>
              </label>
              <input
                type="number"
                name="price"
                min={0}
                value={formData.price}
                onChange={handleChange}
                placeholder="เช่น 500"
                className="input input-bordered w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  อัปโหลดรูปภาพ
                </span>
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                {isSubmitting ? "กำลังบันทึก..." : "เพิ่มบริการ"}
              </button>

              <button
                type="button"
                className="btn btn-ghost w-full sm:w-auto"
                onClick={() => navigate("/manage-services")}
                disabled={isSubmitting}
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateService;
