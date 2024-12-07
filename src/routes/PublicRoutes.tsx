import { Routes, Route } from "react-router";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { ForgotPin } from "./auth/forgot-pin";
import { Mpin } from "./auth/mpin/Mpin";
import { useEffect, useState } from "react";

export const PublicRoutes = () => {
  const [token, setToken] = useState<string | null>(null);
  const [localStorageReady, setLocalStorageReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLocalStorageReady(true);

    // Update state to indicate localStorage has been checked
  }, []);

  return localStorageReady ? (
    <Routes>
      <Route path="/" element={token ? <Mpin /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-pin" element={<ForgotPin />} />
    </Routes>
  ) : (
    <div>Loading</div>
  );
};
