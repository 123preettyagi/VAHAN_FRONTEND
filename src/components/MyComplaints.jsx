import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function MyComplaints() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchComplaint = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter vehicle number");
      return;
    }

    try {
      setLoading(true);
      setError("");

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
      console.error(err);
      setComplaint(null);
      setError("Complaint not found");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700";

      case "in progress":
        return "bg-yellow-100 text-yellow-700";

      case "pending":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 p-6">

        <div className="max-w-4xl mx-auto">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold">
              Search Complaint
            </h1>
            <p>
              Search complaint using vehicle number
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 mb-5">

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Enter Vehicle Number"
                value={vehicleNumber}
                onChange={(e) =>
                  setVehicleNumber(e.target.value)
                }
                className="flex-1 border p-3 rounded-lg"
              />

              <button
                onClick={searchComplaint}
                className="bg-blue-700 text-white px-6 rounded-lg"
              >
                Search
              </button>

            </div>

          </div>

          {loading && (
            <div className="text-center">
              Loading...
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {complaint && (
            <div className="bg-white shadow-lg rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Complaint Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <p>
                  <strong>ID:</strong> {complaint.id}
                </p>

                <p>
                  <strong>Owner Name:</strong>{" "}
                  {complaint.ownerName}
                </p>

                <p>
                  <strong>Vehicle Number:</strong>{" "}
                  {complaint.vehicleNumber}
                </p>

                <p>
                  <strong>Vehicle Type:</strong>{" "}
                  {complaint.vehicleType}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {complaint.category}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {complaint.email}
                </p>

                <p>
                  <strong>Contact:</strong>{" "}
                  {complaint.contact}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {complaint.description}
                </p>

              </div>

            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default MyComplaints;