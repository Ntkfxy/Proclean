import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cleaningService from "../../service/cleaning.service";
import Swal from "sweetalert2";
import { Service } from "../../types";
import Button from "../../components/Button";
import Card from "../../components/Card";
import api from "../../service/api";

const EditService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<
    Omit<Service, "id" | "_id">
  >({
    name: "",
    description: "",
    price: 0,
    image: "",
    duration: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------
  // Fetch service
  // --------------------
  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;

      try {
        const response = await cleaningService.getServiceById(id);
        const { name, description, price, image, duration } =
          response.data;

        setFormData({
          name,
          description,
          price,
          image,
          duration,
        });
      } catch (error: any) {
        Swal.fire(
          "ผิดพลาด",
          error?.response?.data?.message ||
            "ไม่สามารถดึงข้อมูลบริการได้",
          "error"
        );
        navigate("/manage-services");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, navigate]);

  // --------------------
  // Handlers
  // --------------------
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

  // --------------------
  // Submit
  // --------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("details", formData.description);
      form.append("price", String(formData.price));
      form.append("duration", formData.duration);

      if (imageFile) {
        form.append("file", imageFile);
      } else {
        form.append("coverImageUrl", formData.image);
      }

      await cleaningService.updateService(id, form);

      Swal.fire("สำเร็จ", "อัปเดตบริการเรียบร้อยแล้ว", "success");
      navigate("/manage-services");
    } catch (error: any) {
      Swal.fire(
        "ผิดพลาด",
        error?.response?.data?.message ||
          "ไม่สามารถอัปเดตบริการได้",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------
  // Loading state
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
      <div className="container mx-auto max-w-3xl">
        <Card title="แก้ไขบริการทำความสะอาด" className="shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">
                    ชื่อบริการ
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    ราคา (บาท)
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min={0}
                  required
                />
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    ระยะเวลาให้บริการ
                  </span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="เช่น 2 ชั่วโมง"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  เปลี่ยนรูปภาพ (ถ้ามี)
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Image Preview */}
            {(imageFile || formData.image) && (
              <div className="mt-2">
                <label className="label">
                  <span className="label-text font-semibold">
                    ตัวอย่างรูปภาพ
                  </span>
                </label>
                <div className="rounded-xl overflow-hidden border border-base-300 max-w-md">
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : formData.image
                    }
                    alt="Preview"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  รายละเอียดบริการ
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered min-h-[140px]"
                required
              />
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-base-100 pt-4 pb-2 border-t border-base-300">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "กำลังบันทึก..."
                    : "บันทึกการเปลี่ยนแปลง"}
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate("/manage-services")}
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditService;
