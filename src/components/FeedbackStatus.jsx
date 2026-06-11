// FeedbackStatus.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { complaintStatusApi } from "./token";


function FeedbackStatus() {
  const navigate = useNavigate();

  const [requestId, setRequestId] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [statusData, setStatusData] = useState(null);
const [loading, setLoading] = useState(false);

  // GENERATE RANDOM CAPTCHA
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let captchaValue = "";

    for (let i = 0; i < 5; i++) {
      captchaValue += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setGeneratedCaptcha(captchaValue);
  };

  // GENERATE CAPTCHA ON PAGE LOAD
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // REQUEST ID VALIDATION
    if (!requestId.trim()) {
      alert("Please enter Request Id");
      return;
    }

    // ONLY ALPHABETS, DIGITS, /
    const requestRegex = /^[A-Za-z0-9/]+$/;

    if (!requestRegex.test(requestId)) {
      alert("Only alphabets, digits and '/' allowed");
      return;
    }

    // CAPTCHA VALIDATION
    if (!captcha.trim()) {
      alert("Please enter captcha");
      return;
    }

    if (captcha !== generatedCaptcha) {
      alert("Invalid Captcha");

      // REFRESH CAPTCHA AFTER WRONG ENTRY
      generateCaptcha();
      setCaptcha("");
      return;
    }

   /* alert("Form Submitted Successfully"); */


  try {
    setLoading(true);

    const response = await complaintStatusApi(requestId);

    console.log(response.data);

    setStatusData(response.data);

  } catch (error) {

    console.error(error);

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Failed to fetch complaint status");
    }

  } finally {
    setLoading(false);
  }


  };

  return (
    <div className="bg-[#d9d9d9] min-h-screen pb-4">

      {/* TOP HEADER */}
      <div className="w-full">

        {/* SECURITY TEXT */}
        <div className="bg-[#efefef] text-red-600 text-center text-[11px] md:text-sm font-bold py-1 px-2">
          F5 , CTRL+F5 and Right-Click are disabled on service pages due to
          security/technical reasons
        </div>

        {/* BLUE HEADER */}
        <div className="bg-gradient-to-r from-cyan-700 to-sky-500 py-3 px-3 flex items-center justify-between">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="logo"
              className="w-10 md:w-12"
            />

            <div>
              <h1 className="text-white text-sm md:text-lg font-bold leading-tight">
                VAHAN CITIZEN
                <br />
                SERVICES
              </h1>
            </div>
          </div>

          {/* CENTER TEXT */}
          <div className="text-white text-center">
            <h2 className="text-xs md:text-sm font-bold">
              Government of India
            </h2>

            <h1 className="text-sm md:text-xl font-bold mt-1">
              MINISTRY OF ROAD TRANSPORT AND HIGHWAYS
            </h1>
          </div>

          {/* RIGHT LOGO */}
          <img
  src="swach.jpg"
  alt="swachh bharat"
  className="w-50 md:w-50"
/>
        </div>

        {/* NAVBAR */}
        <div className="flex flex-wrap items-center gap-2 bg-[#d6d6d6] px-2 py-2">

          <button className="bg-[#4f8dd9] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow">
            Know Your Payment Transaction Status
          </button>

          <button className="bg-[#4a4a4a] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow">
            Verify Receipt
          </button>

          <button className="bg-[#0d3f91] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow">
            Click here for Feedback/Complaint
          </button>

          <button className="bg-[#4f8dd9] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow">
            Apply For New Registration
          </button>

          <div className="md:ml-auto">
            <button className="bg-[#4f8dd9] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold shadow">
              Administrative Users
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="w-[92%] md:w-[70%] mx-auto mt-4 bg-[#e6e6f0] rounded-[18px] overflow-hidden shadow-md border border-gray-400">

        {/* TITLE */}
        <div className="bg-[#5eafc5] py-2">
          <h1 className="text-center text-white text-xl md:text-2xl font-serif">
            Feedback/Complaint Status
          </h1>
        </div>

        {/* FORM AREA */}
        <div className="flex flex-col items-center justify-center py-6 px-4">

          <p className="text-red-600 text-sm md:text-base font-bold mb-5 text-center">
            Note:- Only alphabets, digits and (/) allowed
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl"
          >

            {/* REQUEST ID */}
            <div className="flex flex-col md:flex-row md:items-center mb-5 gap-2">

              <label className="text-base md:text-lg font-semibold md:w-[140px]">
                Request Id
              </label>

              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="XX/00/VH/00000000/0000000"
                className="flex-1 h-[42px] rounded-xl border border-cyan-300 bg-[#cde8f0] px-3 text-sm md:text-base outline-none shadow-inner"
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex flex-col md:flex-row md:items-center mb-6 gap-3">

              <label className="text-base md:text-lg font-semibold md:w-[140px]">
                Captcha *
              </label>

              <div className="flex flex-wrap items-center gap-3">

                {/* CAPTCHA BOX */}
                <div className="bg-white border-2 border-gray-600 w-[110px] h-[48px] flex items-center justify-center text-xl font-extrabold tracking-[3px] rounded-md">
                  {generatedCaptcha}
                </div>

                {/* REFRESH BUTTON */}
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="bg-[#1386a8] hover:bg-[#0f6d88] text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  Refresh
                </button>
                

                {/* CAPTCHA INPUT */}
                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
                  placeholder="Enter Verification Code"
                  className="w-[220px] h-[42px] border border-gray-400 px-3 text-sm outline-none rounded-lg"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4">

             <button
  type="submit"
  disabled={loading}
  className="bg-[#1386a8] hover:bg-[#0f6d88] text-white text-sm md:text-base font-bold px-6 py-2 rounded-xl shadow border border-gray-500"
>
  {loading ? "Searching..." : "Submit"}
</button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-[#1386a8] hover:bg-[#0f6d88] text-white text-sm md:text-base font-bold px-6 py-2 rounded-xl shadow border border-gray-500"
              >
                Home
              </button>
            </div>

          </form>
     
     {statusData && (
  <div className="mt-8 bg-white rounded-lg shadow-md p-6 border">

    <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
      Complaint Status Details
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <div>
        <strong>Request ID:</strong>
        <p>{statusData.requestId}</p>
      </div>

      <div>
        <strong>Applicant Name:</strong>
        <p>{statusData.applicantName}</p>
      </div>

      <div>
        <strong>Vehicle Number:</strong>
        <p>{statusData.vehicleNumber}</p>
      </div>

      <div>
        <strong>Service Type:</strong>
        <p>{statusData.serviceType}</p>
      </div>

      <div>
        <strong>Amount:</strong>
        <p>₹ {statusData.amount}</p>
      </div>

      <div>
        <strong>Payment Status:</strong>
        <p>{statusData.paymentStatus}</p>
      </div>

      <div>
        <strong>Payment Method:</strong>
        <p>{statusData.paymentMethod}</p>
      </div>

      <div>
        <strong>Reference Number:</strong>
        <p>{statusData.referenceNumber}</p>
      </div>

      <div>
        <strong>Transaction Date:</strong>
        <p>{statusData.transactionDate}</p>
      </div>

      <div>
        <strong>Message:</strong>
        <p>{statusData.message}</p>
      </div>

    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
}

export default FeedbackStatus;