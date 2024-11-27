import { Routes, Route } from "react-router";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { ForgetPin } from "./auth/forgot-pin";
export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-pin" element={<ForgetPin />} />
      <Route path="*" element={<Login />} />{" "}
      {/* Redirect to login by default */}
    </Routes>
  );
};
