import { useState } from "react";
import { getWithAuth } from "./token";

const VerifyReceipt = () => {
  const [regNo, setRegNo] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => 
    {
    if (!regNo || !receiptNo) {
      alert("Please enter all fields");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try 
    {
     
         const res = await getWithAuth("/api/transactions/verify-receipt", {
      method: "POST",
      data: {
        registrationNumber: regNo,
        receiptNumber: receiptNo,
      },
    });

  
    // SUCESS CASE
      console.log("API RESPONSE:", res.data);
      // FIX
  setResult(res.data);

    }
    catch (err) {
  console.error(err);

  //  Extract message from backend response
  if (err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message);
  } else {
    setError("Receipt Not Found");
  }
} 
    finally 
    {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRegNo("");
    setReceiptNo("");
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 text-white text-center py-4 text-xl font-semibold">
          Verify Receipt
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-6">

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">

            <div className="flex flex-col w-full md:w-1/3">
              <label className="mb-1 font-medium">Registration Number</label>
              <input
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Registration Number"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/3">
              <label className="mb-1 font-medium">Receipt Number</label>
              <input
                type="text"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Receipt Number"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleVerify}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Reset
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
            >
              Home
            </button>
            
          </div>

          {/* Loader */}
          {loading && (
            <div className="text-center text-blue-600 font-medium">
              Verifying receipt...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Result UI */}
          {result && (
            <div className="mt-6 border rounded-lg bg-gray-50 p-4">
              <h3 className="text-lg font-semibold mb-4 text-green-600">
                Receipt Verified Successfully
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="p-3 border rounded bg-white">
                  <span className="font-medium">Registration No:</span>
                  <p>{result.registrationNumber}</p>
                </div>

                <div className="p-3 border rounded bg-white">
                  <span className="font-medium">Receipt No:</span>
                  <p>{result.receiptNumber}</p>
                </div>

                <div className="p-3 border rounded bg-white">
                  <span className="font-medium">Payment Status:</span>
                  <p className="text-green-600 font-semibold">
                    {result.status}
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyReceipt;