import React from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Regsiter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  //within formData object we have name, email and password. We are destructuring it for easy access not {formData.name}.

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      //const token = data.token;

      //Storing token in local storage
      localStorage.setItem("token", data.token);

      //Auto login - Profile
      navigate("/profile");
    } catch (error) {
      alert(error.message || "Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name} 
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        <p className="text-center mt-3">Already have an account? <span className="text-blue-700 underline cursor-pointer" onClick={() => navigate("/login")}>Sign In</span></p>
      </form>
    </div>
  );
};

export default Regsiter;
