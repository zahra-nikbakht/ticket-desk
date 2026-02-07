import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { DashboardLayout } from "../../pages/DashboardLayout";
import { TicketsPage } from "../../pages/TicketsPage";
import { NewTicketPage } from "../../pages/NewTicketPage";
import { TicketDetailsPage } from "../../pages/TicketDetailsPage";
import { AdminTicketsPage } from "../../pages/AdminTicketsPage";
import { ProtectedRoute } from "../../shared/components/ProtectedRoute";
import { RoleRoute } from "../../shared/components/RoleRoute";
import { ForbiddenPage } from "../../pages/ForbiddenPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "tickets", element: <TicketsPage /> },
      { path: "tickets/new", element: <NewTicketPage /> },
      { path: "tickets/:id", element: <TicketDetailsPage /> },
    ],
  },
  {
    path: "/admin/tickets",
    element: (
      <ProtectedRoute>
        <RoleRoute allowed={["ADMIN"]}>
          <AdminTicketsPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
  { path: "/403", element: <ForbiddenPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
