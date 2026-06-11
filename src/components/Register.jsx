import { useState } from "react";
import axios from "axios";

function Register() {
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    roles: ["USER"],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );

      alert(data.message || "Registration Successful");

      // Reset form after success
      setFormData(initialFormState);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration Failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  
    return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
    <div className="bg-white p-10 rounded-xl shadow-xl w-[350px] text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Create Account
      </h2>

      <p className="text-gray-500 mb-6">
        Register to get started
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter Username"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  </div>
);


}

export default Register;