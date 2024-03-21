import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { username, password });
      // Inform the user of successful registration, then redirect to the login page
      alert("Registration successful. Please login."); // Inform the user
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to register");
      }
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
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
              <button
                type="submit"
                className="px-4 py-2 bg-rose-500 text-white rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
