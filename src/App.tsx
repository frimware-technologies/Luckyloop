import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
