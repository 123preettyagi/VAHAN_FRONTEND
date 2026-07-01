import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function ViewAppointments() {
  const [customerName, setCustomerName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    "id",
    "customerName",
    "email",
    "phoneNumber",
    "vehicleNumber",
    "vehicleType",
    "serviceType",
    "preferredDate",
    "preferredTime",
    "additionalNotes",
  ];

  const fetchAppointments = async () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:8080/api/transactions/appointments/customer/${customerName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data.appointments || []);
      setTotalAppointments(response.data.totalAppointments || 0);
    } catch (err) {
      console.error(err);

      setAppointments([]);
      setTotalAppointments(0);

      if (err.response?.status === 404) {
        setError("No appointments found");
      } else {
        setError("Failed to fetch appointments");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-orange-700">
              View Appointments
            </h1>

            <p className="text-gray-600 mt-2">
              Search appointments using customer name
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-md p-1 mb-2">
            <div className="flex flex-col md:flex-row gap-1 items-center">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                maxLength={20}
                placeholder="Enter Customer Name"
               className="w-[calc(100%-80px)] border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                // className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <button
                onClick={fetchAppointments}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md"
              >
                Search
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-orange-700 font-semibold">
              Loading appointments...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Count */}
          {!loading && appointments.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-green-700">
                Total Appointments: {totalAppointments}
              </h2>
            </div>
          )}

          {/* Initial Message */}
          {!loading &&
            !error &&
            appointments.length === 0 &&
            customerName === "" && (
              <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
                Search a customer to view appointments
              </div>
            )}

          {/* Table */}
          {appointments.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-orange-600 text-white">
                      {columns.map((column) => (
                        <th
                          key={column}
                          className="px-4 py-3 text-left whitespace-nowrap"
                        >
                          {column
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-b hover:bg-orange-50"
                      >
                        {columns.map((column) => (
                          <td
                            key={column}
                            className="px-4 py-3 whitespace-nowrap"
                          >
                            {appointment[column] ?? "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewAppointments;