import { Routes, Route, Navigate } from "react-router";
import { Home } from "./main-area/home";
import { AddMoney } from "./main-area/add-money";
import { Profile } from "./main-area/profile";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/add-money" element={<AddMoney />} />
      <Route path="/profile" element={<Profile />} />
      {/* Redirect to home */}
    </Routes>
  );
}

export default AuthenticatedRoutes;
