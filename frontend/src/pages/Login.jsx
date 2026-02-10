import React from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (error) {
      alert("An Error Occured: ", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={email}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-center mt-3">New to the website? <span className="text-blue-700 underline cursor-pointer" onClick={() => navigate("/")}>Sign Up</span></p>
      </form>
    </div>
  );
};

export default Login;
