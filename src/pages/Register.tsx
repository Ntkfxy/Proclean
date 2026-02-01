import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../service/authentication.service";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบ",
        text: "กรุณากรอก Username และ Password",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await authService.register(username, password, "Author");

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กรุณาเข้าสู่ระบบ",
          confirmButtonText: "ไปหน้า Login",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ⭐ container จัดกลางจอ (เหมือน Login)
    
  <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-base-100 border border-base-300 rounded-2xl shadow-md"
      >
        <div className="p-8 space-y-6">
          {/* Title */}
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-base-content">
              สมัครสมาชิก
            </h1>
            <p className="text-sm text-base-content/60">
              สร้างบัญชีเพื่อเริ่มใช้งาน
            </p>
          </header>

          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-base-content/60">
            มีบัญชีอยู่แล้ว?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-1 font-medium text-primary hover:underline"
            >
              เข้าสู่ระบบ
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
