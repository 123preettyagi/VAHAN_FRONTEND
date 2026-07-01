import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function TrackComplaint() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackComplaint = async () => 
    {
    const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;

    if (!vehicleNumber.trim()) 
    {
      setError("Please enter Vehicle Number");
      return;
    }

    if (!vehicleRegex.test(vehicleNumber)) 
    {
      setError("Enter a valid vehicle number (e.g. DL01AB1234)");
      return;
    }

    setLoading(true);
    setError("");
    setComplaint(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/transactions/register-complaint/${vehicleNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "No complaint found."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h1 className="text-3xl font-bold text-center text-cyan-700 mb-2">
              Track Complaint
            </h1>

            <p className="text-center text-gray-500 mb-8">
              Search Complaint By Vehicle Number
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => {
                  setVehicleNumber(
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                  );
                  setError("");
                }}
                className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                onClick={trackComplaint}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {loading ? "Searching..." : "Track Complaint"}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">
                {error}
              </div>
            )}

            {complaint && (
              <div className="bg-gray-50 border rounded-2xl p-6">

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Complaint #{complaint.id}
                  </h2>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="text-gray-500 text-sm">
                      Complaint ID
                    </label>
                    <p className="font-semibold">{complaint.id}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Owner Name
                    </label>
                    <p className="font-semibold">{complaint.ownerName}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Vehicle Number
                    </label>
                    <p className="font-semibold">{complaint.vehicleNumber}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Status
                    </label>
                    <p className="font-semibold">{complaint.status}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Created Date
                    </label>
                    <p className="font-semibold">
                      {new Date(
                        complaint.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Message
                    </label>
                    <p className="font-semibold text-green-600">
                      {complaint.message}
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TrackComplaint;