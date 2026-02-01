import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  Sparkles,
  History,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { userInfo, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo?.username;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const NavLink = ({
    to,
    children,
    className = "",
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`
        flex items-center gap-2
        px-4 py-3 rounded-lg
        hover:bg-base-200
        transition-colors
        ${className}
      `}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* แถบนำทาง */}
      <div className="navbar sticky top-0 z-50 px-4 sm:px-6 backdrop-blur-md bg-base-100/80 border-b border-base-300">
        {/* ซ้าย */}
        <div className="navbar-start">
          <Link
            to="/"
            className="
              text-xl sm:text-2xl font-extrabold tracking-tight
              text-base-content flex items-center gap-2
              hover:text-primary transition-colors
            "
          >
            <Sparkles className="text-primary" size={26} />
            <span>ProClean</span>
          </Link>
        </div>

        {/* เมนู Desktop */}
        <div className="navbar-end hidden md:flex gap-3">
          {username ? (
            <>
              {userInfo?.role === "Author" && (
                <>
                  <Link
                    to="/manage-services"
                    className="btn btn-ghost btn-sm font-medium text-primary flex items-center gap-2"
                  >
                    <LayoutDashboard size={18} />
                    จัดการบริการ
                  </Link>

                  <Link
                    to="/manage-bookings"
                    className="btn btn-ghost btn-sm font-medium text-secondary flex items-center gap-2"
                  >
                    <History size={18} />
                    การจองทั้งหมด
                  </Link>
                </>
              )}

              <Link
                to="/my-bookings"
                className="btn btn-ghost btn-sm font-medium flex items-center gap-2"
              >
                <History size={18} />
                การจองของฉัน
              </Link>

              <Link
                to="/book"
                className="
                  btn btn-sm
                  bg-primary text-primary-content
                  hover:bg-primary-focus
                  rounded-full font-semibold
                "
              >
                จองบริการ
              </Link>

              {/* โปรไฟล์ */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="
                    btn btn-outline btn-sm
                    rounded-full font-medium
                    border-base-300
                    hover:border-primary hover:text-primary
                  "
                >
                  <div className="flex items-center gap-2">
                    <UserIcon size={18} />
                    <span>{username}</span>
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="
                    dropdown-content menu
                    mt-3 w-48
                    rounded-xl bg-base-100
                    border border-base-300 shadow
                  "
                >
                  <li className="p-4 text-xs font-bold opacity-50 uppercase tracking-widest border-b border-base-200">
                    {userInfo?.role}
                  </li>
                  <li className="mt-1">
                    <button
                      onClick={handleLogout}
                      className="text-error flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm rounded-full"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-sm rounded-full"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        {/* ปุ่มมือถือ */}
        <div className="navbar-end md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ฉากหลังมือถือ */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          transition-opacity
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setOpen(false)}
      />

      {/* เมนูสไลด์มือถือ */}
      <aside
        className={`
          fixed top-0 right-0 z-50
          h-full w-72
          bg-base-100 shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <span className="font-bold text-lg">เมนู</span>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {username ? (
            <>
              <div className="px-4 py-2 text-sm opacity-70">
                {username} ({userInfo?.role})
              </div>

              {userInfo?.role === "Author" && (
                <>
                  <NavLink to="/manage-services" className="text-primary">
                    <LayoutDashboard size={18} />
                    จัดการบริการ
                  </NavLink>

                  <NavLink to="/manage-bookings" className="text-secondary">
                    <History size={18} />
                    การจองทั้งหมด
                  </NavLink>
                </>
              )}

              <NavLink to="/my-bookings">
                <History size={18} />
                การจองของฉัน
              </NavLink>

              <NavLink
                to="/book"
                className="bg-primary text-primary-content font-semibold"
              >
                จองบริการ
              </NavLink>

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2
                  w-full px-4 py-3 rounded-lg
                  text-error hover:bg-base-200
                "
              >
                <LogOut size={18} />
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">เข้าสู่ระบบ</NavLink>
              <NavLink to="/register">สมัครสมาชิก</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
