import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CustomerHome from "../pages/CustomerHome";
import AgentHome from "../pages/AgentHome";
import AdminHome from "../pages/AdminHome";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/customer", element: <CustomerHome /> },
  { path: "/agent", element: <AgentHome /> },
  { path: "/admin", element: <AdminHome /> },
]);

