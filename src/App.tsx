import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";
import { ForgetPin } from "./routes/auth/forgot-pin";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-pin" element={<ForgetPin />} />
    </Routes>
  );
}
