import React, { useState, useContext, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../service/authentication.service";
import { UserContext } from "../context/UserContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logIn } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const state = location.state as { registered?: boolean } | null;
    if (state?.registered) {
      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "กรุณาเข้าสู่ระบบ",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (userInfo?.accessToken) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    try {
      const res = await authService.login(username, password);

      if (res?.accessToken) {
        logIn(res);

        Swal.fire({
          icon: "success",
          text: "เข้าสู่ระบบสำเร็จ",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text:
          err?.response?.data?.message ||
          "Username หรือ Password ไม่ถูกต้อง",
      });
    }
  };

  return (
    // ⭐ Container จัดกลางจอ
  <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-base-100 border border-base-300 rounded-2xl shadow-md"
      >
        <div className="p-8 space-y-6">
          {/* Title */}
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-base-content">
              เข้าสู่ระบบ
            </h1>
            <p className="text-sm text-base-content/60">
              กรุณาเข้าสู่ระบบเพื่อใช้งาน
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm text-base-content/60">
            ยังไม่มีบัญชี?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-1 font-medium text-primary hover:underline"
            >
              สมัครสมาชิก
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
