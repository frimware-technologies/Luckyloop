import { createContext, useContext, useState } from "react";
import { Routes, Route } from "react-router";
import { PublicRoutes } from "./routes/PublicRoutes";
import AuthenticatedRoutes from "./routes/PrivateRoutes";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
// Create an Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set your authentication logic here
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes>
        {!isAuthenticated && <Route path="/*" element={<PublicRoutes />} />}
        {isAuthenticated && (
          <Route path="/*" element={<AuthenticatedRoutes />} />
        )}
      </Routes>
    </AuthContext.Provider>
  );
}
