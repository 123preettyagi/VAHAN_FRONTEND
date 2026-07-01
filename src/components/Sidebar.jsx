import React, { useState } from "react";
import axios from "axios";

function Sidebar() {

  const [formData, setFormData] = useState({
    vehicleRegistrationNo: "",
    state: "",
    rtoName: "",
    privacyAccepted: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {

    // ==========================
    // Existing Frontend Validation
    // (Keep your validation here)
    // ==========================

    if (!formData.vehicleRegistrationNo) {
      alert("Enter Vehicle Registration Number");
      return;
    }

    if (!formData.state) {
      alert("Select State");
      return;
    }

    if (!formData.rtoName) {
      alert("Select RTO");
      return;
    }

    if (!formData.privacyAccepted) {
      alert("Please accept Privacy Policy");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "",
        {
          vehicleRegistrationNo: formData.vehicleRegistrationNo,
          state: formData.state,
          rtoName: formData.rtoName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      alert("Feedback Saved Successfully");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message || "Failed");
      } else {
        alert("Server Error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-[320px] overflow-hidden border">

      {/* Header */}
      <div className="bg-teal-700 text-white text-center py-3 text-lg font-semibold">
        Choose option to avail Services
      </div>

      <div className="p-4">

        {/* Options */}
        <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-700">

          <div className="flex items-center gap-2">
            <img
              src="vehicle.jpg"
              alt="vehicle"
              className="w-12 h-12"
            />
            <span>Vehicle Registration No.</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
              alt="authority"
              className="w-8 h-8"
            />
            <span>Registering Authority</span>
          </div>

        </div>

        {/* Vehicle Number */}

        <input
          type="text"
          name="vehicleRegistrationNo"
          placeholder="ENTER REGISTRATION NUMBER"
          value={formData.vehicleRegistrationNo}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* State */}

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl bg-gray-100 text-gray-600"
        >
          <option value="">SELECT STATE</option>
          <option value="Delhi">Delhi</option>
          <option value="Haryana">Haryana</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
        </select>

        {/* RTO */}

        <select
          name="rtoName"
          value={formData.rtoName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl bg-gray-100 text-gray-600"
        >
          <option value="">SELECT RTO</option>
          <option value="Delhi RTO">Delhi RTO</option>
          <option value="Gurgaon RTO">Gurgaon RTO</option>
          <option value="Noida RTO">Noida RTO</option>
        </select>

        {/* Checkbox */}

        <div className="flex items-start gap-2 text-sm mb-4">

          <input
            type="checkbox"
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleChange}
            className="mt-1"
          />

          <p>
            I accept to have read the{" "}
            <span className="text-red-600 font-medium cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="text-red-600 font-medium cursor-pointer">
              Terms of Service
            </span>{" "}
            for processing of my personal data into the system
          </p>

        </div>

        {/* Button */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-xl shadow-md hover:bg-teal-700 transition"
        >
          {loading ? "Please Wait..." : "Proceed"}
        </button>

      </div>
    </div>
  );
}

export default Sidebar;