import { Routes, Route } from "react-router";
import { PublicRoutes } from "./routes/PublicRoutes";
import AuthenticatedRoutes from "./routes/PrivateRoutes";

export default function App() {
  const isAuthenticated = true;

  return (
    <Routes>
      {!isAuthenticated && <Route path="/*" element={<PublicRoutes />} />}
      {isAuthenticated && <Route path="/*" element={<AuthenticatedRoutes />} />}
    </Routes>
  );
}
