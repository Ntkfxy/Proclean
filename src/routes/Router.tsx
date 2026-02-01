import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ServiceDetail from "../pages/services/ServiceDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Booking from "../pages/bookings/Booking";
import MyBookings from "../pages/bookings/MyBookings";
import ManageServices from "../pages/services/ManageServices";
import CreateService from "../pages/services/CreateService";
import EditService from "../pages/services/EditService";
import ManageAllBookings from "../pages/bookings/ManageAllBookings";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "service/:id", element: <ServiceDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "book",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-services",
        element: (
          <ProtectedRoute allowedRoles={["Author"]}>
            <ManageServices />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-service",
        element: (
          <ProtectedRoute allowedRoles={["Author"]}>
            <CreateService />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-service/:id",
        element: (
          <ProtectedRoute allowedRoles={["Author"]}>
            <EditService />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <ProtectedRoute allowedRoles={["Author"]}>
            <ManageAllBookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
