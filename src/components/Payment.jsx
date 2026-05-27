
import React, { useState, useEffect } from "react";
import API, { getToken } from "./token";
import { getTransactions } from "./api";

function Payment() {
  const [searchType, setSearchType] = useState("transactionId");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // API mapping
  const endpointMap = {
  transactionId: "/api/transactions/transaction-id/",
  paymentId: "/api/transactions/payment-id/",
  bankRefNo: "/api/transactions/bank-ref/",
  grnNo: "/api/transactions/grn-no/",
  registrationNo: "/api/transactions/registration-no/",
};

 

  const loadAllTransactions = async () => {
    try {
      setLoading(true);
      const result = await getTransactions();
      setData(result || []);
    } catch (err) {
      console.error(err);
      alert("Error loading transactions");
    } finally {
      setLoading(false);
    }
  };

  // Unified search (combines both codes)
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      alert("Please enter a value");
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      const url =
        endpointMap[searchType] + encodeURIComponent(searchValue);

      const response = await API.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(
        Array.isArray(response.data)
          ? response.data
          : response.data
          ? [response.data]
          : []
      );
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Session expired. Logging in again...");
        localStorage.removeItem("token");
      } else if (error.response?.status === 403) {
        alert("Forbidden: No access");
      } else {
        alert("Error fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f2f7] font-sans">
      
      

      {/* Title */}
      <div className="bg-blue-600 text-white text-center py-2 text-lg font-semibold">
        Transaction Status
      </div>

      {/* Search Section */}
      <div className="bg-white max-w-4xl mx-auto mt-4 p-4 rounded shadow">
        
        {/* Radio Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {Object.keys(endpointMap).map((type) => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="radio"
                value={type}
                checked={searchType === type}
                onChange={(e) => setSearchType(e.target.value)}
              />
              {type.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        {/* Input + Buttons */}
        <div className="flex justify-center gap-3">
          <input
            type="text"
            className="border px-3 py-1 w-64 rounded"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter value"
          />

          <button
  onClick={handleSearch}
  disabled={loading}
  className="bg-blue-600 text-white px-5 py-1 rounded cursor-pointer hover:bg-blue-700 transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Searching..." : "Search"}
</button>

<button
  onClick={() => {
    setSearchValue("");
    setData([]);
  }}
  className="bg-gray-500 text-white px-5 py-1 rounded cursor-pointer hover:bg-gray-600 transition duration-200"
>
  Reset
</button>

        </div>

      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-6 overflow-x-auto">
        <table className="w-full border bg-white text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Sl. No.</th>
              <th className="border p-2">Vehicle No</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Payment ID</th>
              <th className="border p-2">Bank Ref No</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.vehicleNo || "N/A"}</td>
                  <td className="border p-2">{item.transactionId || "N/A"}</td>
                  <td className="border p-2">{item.paymentId || "N/A"}</td>
                  <td className="border p-2">{item.bankRefNo || "N/A"}</td>
                  <td className="border p-2">{item.amount || "0"}</td>
                  <td className="border p-2 font-bold text-green-600">
                    {item.status || "Unknown"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  {loading ? "Loading..." : "No records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       


    </div>

    
  );
}

export default Payment;