import { useState } from "react";
import axios from "axios";

function NocIssuedVehicle() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [nocData, setNocData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchNOC = async () => {
    if (!vehicleNo.trim()) {
      setError("Please enter a vehicle number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setNocData(null);

      const response = await axios.get(
        `http://localhost:8080/api/noc/${vehicleNo.trim()}`
      );

      setNocData(response.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        setError("No NOC record found for this vehicle.");
      } else {
        setError("Unable to fetch NOC details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-800">
            NOC Issued Vehicle Details
          </h1>
          <p className="text-gray-600 mt-2">
            Search and verify NOC issued vehicle information
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Vehicle Number (e.g. UP16AB1234)"
              value={vehicleNo}
              onChange={(e) =>
                setVehicleNo(e.target.value.toUpperCase())
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchNOC();
                }
              }}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            />

            <button
              onClick={searchNOC}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Searching..." : "🔍 Search"}
            </button>

          </div>

          {error && (
            <div className="mt-5 bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        {nocData && (
          <div className="mt-8 bg-white shadow-2xl rounded-3xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white p-6">
              <h2 className="text-2xl font-bold">
                Vehicle Information
              </h2>
              <p className="opacity-90">
                NOC Verification Details
              </p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                <InfoCard
                  title="Vehicle Number"
                  value={nocData.vehicleNumber}
                />

                <InfoCard
                  title="Owner Name"
                  value={nocData.ownerName}
                />

                <InfoCard
                  title="Chassis Number"
                  value={nocData.chassisNumber}
                />

                <InfoCard
                  title="Engine Number"
                  value={nocData.engineNumber}
                />

                <InfoCard
                  title="NOC Number"
                  value={nocData.nocNumber}
                />

                <InfoCard
                  title="Issue Date"
                  value={nocData.nocIssueDate}
                />

                <InfoCard
                  title="From State"
                  value={nocData.fromState}
                />

                <InfoCard
                  title="To State"
                  value={nocData.toState}
                />

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">
                    Status
                  </p>

                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {nocData.status}
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-2xl p-5 transition duration-300 shadow-sm hover:shadow-md">
      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      <p className="font-semibold text-gray-800 break-words">
        {value || "-"}
      </p>
    </div>
  );
}

export default NocIssuedVehicle;