import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function RegisterComplaint() {
  const [formData, setFormData] = useState({
    ownerName: "",
    vehicleNumber: "",
    vehicleType: "",
    category: "",
    contact: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "vehicleNumber") {
      value = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Owner Name
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    } else if (
      formData.ownerName.length < 3 ||
      formData.ownerName.length > 12
    ) {
      newErrors.ownerName =
        "Owner name must be between 3 and 12 characters";
    }

    // Vehicle Number
    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    } else if (!vehicleRegex.test(formData.vehicleNumber)) {
      newErrors.vehicleNumber =
        "Format should be like DL01AB1234";
    }

    // Vehicle Type
    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vehicle type is required";
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Contact Number
    const contactRegex = /^[6-9]\d{9}$/;

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact =
        "Enter valid 10-digit Indian mobile number";
    }

    // Email
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (
      formData.description.length < 10 ||
      formData.description.length > 50
    ) {
      newErrors.description =
        "Description must be between 10 and 50 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      ownerName: "",
      vehicleNumber: "",
      vehicleType: "",
      category: "",
      contact: "",
      email: "",
      description: "",
    });

    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/transactions/register-complaint",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMsg(
        response.data.message ||
          "Complaint registered successfully."
      );

      clearForm();
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to register complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 px-3 py-4">
        <div className="max-w-2xl mx-auto">

          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg px-4 py-3 mb-3 shadow">
            <h1 className="text-xl font-bold text-white">
              Register Complaint
            </h1>
            <p className="text-sm text-cyan-100">
              Submit your vehicle complaint details
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">

            {successMsg && (
              <div className="mb-3 p-2 text-sm rounded border border-green-300 bg-green-100 text-green-700">
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-3 p-2 text-sm rounded border border-red-300 bg-red-100 text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Owner Name
                  </label>

                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />

                  {errors.ownerName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ownerName}
                    </p>
                  )}
                </div>

                {/* Vehicle Number */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="DL01AB1234"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />

                  {errors.vehicleNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.vehicleNumber}
                    </p>
                  )}
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select Type</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Truck">Truck</option>
                    <option value="Bus">Bus</option>
                  </select>

                  {errors.vehicleType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.vehicleType}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select Category</option>
                    <option value="Registration Issue">
                      Registration Issue
                    </option>
                    <option value="RC Transfer Delay">
                      RC Transfer Delay
                    </option>
                    <option value="Ownership Issue">
                      Ownership Issue
                    </option>
                    <option value="Permit Issue">
                      Permit Issue
                    </option>
                    <option value="Tax Related">
                      Tax Related
                    </option>
                    <option value="Other">Other</option>
                  </select>

                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Number
                  </label>

                  <input
                    type="tel"
                    name="contact"
                    maxLength="10"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />

                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>

                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm resize-none"
                  placeholder="Enter complaint details..."
                />

                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold text-sm"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RegisterComplaint;