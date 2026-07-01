import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function BookAppointment() {
  const [service, setService] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    vehicleNumber: "",
    vehicleType: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const payload = {
        customerName: service.customerName,
        email: service.email,
        phoneNumber: service.phoneNumber,
        vehicleNumber: service.vehicleNumber.toUpperCase(),
        vehicleType: service.vehicleType,
        serviceType: service.serviceType,
        preferredDate: service.preferredDate,
        preferredTime: service.preferredTime + ":00",
        additionalNotes: service.additionalNotes,
      };

      await axios.post(
        "http://localhost:8080/api/transactions/appointments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Appointment booked successfully!");

      setService({
        customerName: "",
        email: "",
        phoneNumber: "",
        vehicleNumber: "",
        vehicleType: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        additionalNotes: "",
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Failed to book appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-100 py-6 px-3">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-orange-700">
              Vehicle Service Appointment
            </h1>

            <p className="text-gray-600 mt-1 text-sm">
              Schedule your vehicle service quickly and easily
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

            <form onSubmit={handleSubmit}>

              <div className="space-y-4">

                <input
                  type="text"
                  name="customerName"
                   required
                   minLength={2}
                   maxLength={10}
                   pattern="^[A-Za-z ]+$"
                  title="Name must contain only letters and spaces (2-50 characters)"
                  placeholder="Customer Name"
                  value={service.customerName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={service.email}
                  onChange={handleChange}
                  required
                  maxLength={15}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <input
                  type="text"
                  name="phoneNumber"
                  required
               minLength={10}
                maxLength={10}
                 pattern="^[0-9]{10}$"
    title="Phone number must contain exactly 10 digits"
                  placeholder="Phone Number"
                  value={service.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number"
                  value={service.vehicleNumber}
                  onChange={handleChange}
                  required
                    minLength={5}
                     maxLength={15}
                     pattern="^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$"
                      title="Enter a valid vehicle number (e.g., DL01AB1234)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <select
                  name="vehicleType"
                  value={service.vehicleType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Car">Car</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                </select>

                <select
                  name="serviceType"
                  value={service.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">Select Service Type</option>
                  <option value="General Service">General Service</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Wheel Alignment">Wheel Alignment</option>
                  <option value="Brake Repair">Brake Repair</option>
                  <option value="Engine Checkup">Engine Checkup</option>
                  <option value="Battery Replacement">
                    Battery Replacement
                  </option>
                </select>

                <input
                  type="date"
                  name="preferredDate"
                  value={service.preferredDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <input
                  type="time"
                  name="preferredTime"
                  value={service.preferredTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <textarea
                  rows="3"
                  name="additionalNotes"
                  placeholder="Additional Notes"
                  value={service.additionalNotes}
                  maxLength={15}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

              </div>

              {error && (
                <div className="mt-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="mt-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg text-sm">
                  {message}
                </div>
              )}

             <button
  type="submit"
  className="w-full mt-5 bg-orange-600 text-white py-3 rounded-lg font-semibold cursor-pointer"
>
  📅 Book Appointment
</button>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookAppointment;