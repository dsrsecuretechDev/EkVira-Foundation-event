// src/components/ProtectedRoute.tsx
import React, { useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("auth") === "true"
  );
  const [showLogin, setShowLogin] = useState<boolean>(!isAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔒 Replace with your own authentication logic
    if (username === "eventupdate" && password === "eventdata2024") {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      alert("Invalid username or password");
    }
  };

  if (!isAuthenticated && showLogin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className=" p-6 rounded-xl shadow-md w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">
            🔐 Enter Credentials
          </h2>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded w-full mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ If authenticated, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
