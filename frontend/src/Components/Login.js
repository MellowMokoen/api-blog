// In your Login.js file
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth(); // Use the useAuth hook here
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(username, password);
      navigate("/blog"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally handle login failure (e.g., display an error message)
    }
  };

  return (
    <div className="bg-my-image bg-no-repeat bg-cover py-10 md:bg-cover">
      <div className="container mx-auto pb-14 bg-white rounded-md">
        <div className="font-rubik">
          <div className="flex justify-center items-center h-screen">
            <form
              onSubmit={handleSubmit}
              className="p-20 px-20 bg-white rounded-lg shadow-md"
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-500 text-white rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
                <Link to="/register">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-500 text-white rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign-up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
