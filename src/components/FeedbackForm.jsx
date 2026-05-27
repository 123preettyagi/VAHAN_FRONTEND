import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import {
  generateOtpApi,
  verifyOtpApi,
  submitComplaintApi,
  feedbackDataApi,
} from "./token";

const stateRtoData = {
  Delhi: [
    "Delhi North",
    "Delhi South",
    "Delhi East",
    "Delhi West",
    "Janakpuri",
    "Rohini",
  ],
  Haryana: [
    "Gurgaon",
    "Faridabad",
    "Panipat",
    "Karnal",
    "Sonipat",
  ],
  Uttar_Pradesh: [
    "Noida",
    "Ghaziabad",
    "Lucknow",
    "Kanpur",
    "Agra",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Kota",
    "Ajmer",
  ],
  Punjab: [
    "Ludhiana",
    "Amritsar",
    "Patiala",
    "Jalandhar",
  ],
  Maharashtra: [
    "Mumbai Central",
    "Pune",
    "Nagpur",
    "Nashik",
  ],
};

const FeedbackForm = () => {
  const [searchBy, setSearchBy] = useState("registration");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleRegistrationNo: "",
    chassisNumber: "",
    applicationNo: "",
    state: "",
    rtoName: "",
    transactionPurpose: "",
    feedbackDescription: "",
    file: null,
    email: "",
  });

  // ==================FETCH FEEDBACK DATA================================
  const handleFetchFeedbackData = async () => {
    try {
      setLoading(true);
      const response = await feedbackDataApi({
        vehicleRegistrationNo: formData.vehicleRegistrationNo,
        chassisNumber: formData.chassisNumber,
      });
      console.log(response.data);
      setMessage(response.data.message);
      
      if (response.data.data) {
        setFormData((prev) => ({
          ...prev,
          vehicleRegistrationNo: response.data.data.vehicleRegistrationNo || "",
          chassisNumber: response.data.data.chassisNumber || "",
        }));
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch feedback data");
    } finally {
      setLoading(false);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // ================= FILE VALIDATION =================
    if (name === "file") {
      const selectedFile = files[0];

      if (!selectedFile) {
        setFormData((prev) => ({
          ...prev,
          file: null,
        }));
        return;
      }

      // Allowed Types
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

      // Validate file type
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage(
          "You need to upload screenshot only in JPG, JPEG or PNG format"
        );

        e.target.value = "";

        setFormData((prev) => ({
          ...prev,
          file: null,
        }));

        return;
      }

      // Validate file size (500KB)
      if (selectedFile.size > 500 * 1024) {
        setMessage("Image size should not be more than 500KB");

        e.target.value = "";

        setFormData((prev) => ({
          ...prev,
          file: null,
        }));

        return;
      }

      // Valid file
      setMessage("");

      setFormData((prev) => ({
        ...prev,
        file: selectedFile,
      }));

      return;
    }

    // ================= NORMAL INPUTS =================
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" && { rtoName: "" }),
    }));
  };


  // ================= GENERATE OTP =================
  const handleGenerateOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter email address");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await generateOtpApi({
        emailId: formData.email
      });
      console.log("Generate OTP response:", response.data);

      setOtpGenerated(true);

      setMessage(response.data.message || "OTP Sent Successfully to your email");
    } catch (error) {
      console.error("Generate OTP error:", error);
      setMessage(error.response?.data?.message || "Failed to generate OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    if (!formData.email) {
      setMessage("Email not found. Please re-enter email and generate OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await verifyOtpApi({
        emailId: formData.email,
        otp: otp
      });
      console.log("Verify OTP response:", response.data);

      if (response.data.success) 
        {
        setMessage(response.data.message || "OTP Verified Successfully");
        setOtpVerified(true);
      } 

      else 
        {
        setMessage(response.data.message || "Invalid OTP");
        setOtpVerified(false);
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      setMessage(error.response?.data?.message || "Failed to verify OTP");
      setOtpVerified(false);
    } finally {
      setLoading(false);
    }
  };

  // ================= SUBMIT FORM =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    /* if (!formData.vehicleRegistrationNo) {
      setMessage("Please enter Vehicle Registration Number");
      return;
    } */

// ================= VEHICLE NUMBER VALIDATION =================
if (searchBy === "registration") {

  if (!formData.vehicleRegistrationNo.trim()) {
    setMessage("Please enter Vehicle Registration Number");
    return;
  }

  if (
    formData.vehicleRegistrationNo.trim().length < 5 ||
    formData.vehicleRegistrationNo.trim().length > 10
  ) {
    setMessage(
      "Vehicle Registration Number must be between 5 and 10 characters"
    );
    return;
  }
}


// ================= APPLICATION NUMBER VALIDATION =================
if (searchBy === "application") {

  if (!formData.applicationNo.trim()) {
    setMessage("Please enter Application Number");
    return;
  }

  if (
    formData.applicationNo.trim().length < 5 ||
    formData.applicationNo.trim().length > 10
  ) {
    setMessage(
      "Application Number must be between 5 and 10 characters"
    );
    return;
  }
}

    if (!formData.chassisNumber) {
      setMessage("Please enter Chassis Number");
      return;
    }
    if (!formData.state) {
      setMessage("Please select State");
      return;
    }
    if (!formData.rtoName) {
      setMessage("Please select RTO Name");
      return;
    }
    if (!formData.transactionPurpose) {
      setMessage("Please select Transaction Purpose");
      return;
    }
    if (!formData.feedbackDescription) {
      setMessage("Please enter Feedback/Problem description");
      return;
    }


        // ================= FILE REQUIRED VALIDATION =================
        // FILE CHECK FIRST
    if (!formData.file) {
      setMessage("You need to upload screenshot of the problem");
      return;
    }

    if (!formData.email) {
      setMessage("Please enter Email");
      return;
    }

    if (!otpVerified) {
      setMessage("Please verify OTP first");
      return;
    }


    try {
      setLoading(true);
      const submitData = new FormData();

      // Append all form fields
      submitData.append("vehicleRegistrationNo", formData.vehicleRegistrationNo);
      submitData.append("chassisNumber", formData.chassisNumber);
      submitData.append("state", formData.state);
      submitData.append("rtoName", formData.rtoName);
      submitData.append("transactionPurpose", formData.transactionPurpose);
      submitData.append("feedbackDescription", formData.feedbackDescription);
      submitData.append("email", formData.email);
      
      if (formData.applicationNo) {
        submitData.append("applicationNo", formData.applicationNo);
      }

      // Append file if exists
      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const response = await submitComplaintApi(submitData);
      console.log(response.data);
      setMessage(response.data.message || "Complaint Submitted Successfully");
      alert("Complaint Submitted Successfully");
      handleReset();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const handleReset = () => {
    setSearchBy("registration");
    setOtp("");
    setOtpVerified(false);
    setOtpGenerated(false);
    setFormData({
      vehicleRegistrationNo: "",
      chassisNumber: "",
      applicationNo: "",
      state: "",
      rtoName: "",
      transactionPurpose: "",
      feedbackDescription: "",
      file: null,
      email: "",
    });
    setMessage("");
  };

  // Dynamic RTO List
  const rtoList = stateRtoData[formData.state] || [];

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-7xl mx-auto bg-[#dfe6ef] rounded-2xl shadow-lg overflow-hidden">

{/* Top Link */}
  <div className="flex justify-end px-6 pt-4">

    <button
  type="button"
  onClick={() => navigate("/check-status")}
  className="text-pink-600 text-[18px] font-semibold underline hover:text-pink-700 transition duration-300 cursor-pointer"
>
  Check status of already submitted request
</button>

  </div>

        {/* Header */}
        <div className="bg-[#5f9ea0] text-white text-center py-6 rounded-t-2xl">
          <h2 className="text-xl font-serif">
            Feedback related to Vahan Citizen Services
          </h2>
          <p className="text-sm mt-1">
            For Technical Problems being faced while availing Vahan Services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Radio Buttons */}
          <div className="flex justify-center gap-12 mb-8">

            <label className="flex items-center gap-2 text-[15px]">
              <input
                type="radio"
                checked={searchBy === "registration"}
                onChange={() => setSearchBy("registration")}
              />
              By Vehicle Registration Number
            </label>
            
            <label className="flex items-center gap-2 text-[15px]">
              <input
                type="radio"
                checked={searchBy === "application"}
                onChange={() => setSearchBy("application")}
              />
              By Application Number
            </label>
            
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">
            {/* Registration */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Vehicle Registration No <span className="text-red-500">*</span>
              </label>
              <input
                name="vehicleRegistrationNo"
                value={formData.vehicleRegistrationNo}
                onChange={handleChange}
                disabled={searchBy !== "registration"}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400 bg-[#e6dcd5]"
              />
            </div>

            {/* Chassis */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Chassis Number (Last 5 characters) <span className="text-red-500">*</span>
              </label>
              <input
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400"
              />
            </div>

            {/* Application */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Application Number
              </label>
              <input
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleChange}
                disabled={searchBy !== "application"}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400 bg-gray-200"
              />
            </div>

            {/* State Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                State where vehicle is registered
                <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400"
              >
                <option value="">Select State</option>
                {Object.keys(stateRtoData).map((state) => (
                  <option key={state} value={state}>
                    {state.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* RTO Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                RTO Name
                <span className="text-red-500">*</span>
              </label>
              <select
                name="rtoName"
                value={formData.rtoName}
                onChange={handleChange}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400"
              >
                <option value="">Select RTO</option>
                {rtoList.map((rto, index) => (
                  <option key={index} value={rto}>
                    {rto}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Transaction purpose <span className="text-red-500">*</span>
              </label>
              <select
                name="transactionPurpose"
                value={formData.transactionPurpose}
                onChange={handleChange}
                className="w-full h-[35px] px-3 rounded-md border border-gray-400"
              >
                <option value="">Select Transaction purpose</option>
                <option value="Vehicle Registration">Vehicle Registration</option>
                <option value="RC Transfer">RC Transfer</option>
                <option value="Duplicate RC">Duplicate RC</option>
                <option value="Fitness Certificate">Fitness Certificate</option>
                <option value="Permit Related">Permit Related</option>
                <option value="Tax Payment">Tax Payment</option>
                <option value="NOC Issue">NOC Issue</option>
                <option value="Ownership Change">Ownership Change</option>
                <option value="Hypothecation">Hypothecation</option>
                <option value="Driving License Related">Driving License Related</option>
                <option value="Online Payment Failed">Online Payment Failed</option>
                <option value="Application Pending">Application Pending</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Description + File Upload Row */}
          <div className="mt-8 grid md:grid-cols-2 gap-6 items-start">
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Feedback/Problem description (max 500 characters)
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="feedbackDescription"
                value={formData.feedbackDescription}
                onChange={handleChange}
                maxLength={500}
                className="w-[325PX] h-[100px] px-3 py-2 rounded-md border border-gray-400 bg-[#bcd7e3]"
              />
              <p className="text-red-600 text-sm mt-1">
                Note:- Characters are Not Allowed to enter (),^,=,%,&lt;,&gt;
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Upload screenshot of problem being encountered
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-[325px] text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
              />
              <p className="text-red-600 text-sm mt-1">
                Note:- Upload only png, jpg, jpeg files and Image Size Should not be more than 500KB
              </p>

            </div>

          </div>

          {/* Email + OTP */}
  
<div className="mt-6 flex items-center gap-3 flex-wrap">

  {/* Dynamic Input */}
  <div>
    <label className="block text-sm font-semibold mb-1">
      {!otpGenerated ? (
        <>
          Email <span className="text-red-500">*</span>
        </>
      ) : (
        <>
          Enter OTP <span className="text-red-500">*</span>
        </>
      )}
    </label>

    <input
      type={!otpGenerated ? "email" : "text"}
      value={!otpGenerated ? formData.email : otp}
      onChange={(e) =>
        !otpGenerated
          ? setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          : setOtp(e.target.value)
      }
      placeholder={!otpGenerated ? "Enter Email" : "Enter OTP"}
      className="w-[250px] h-[45px] px-3 rounded-md border border-gray-400"
    />
  </div>

  {/* Button */}
  {!otpGenerated ? (
    <button
      type="button"
      onClick={handleGenerateOtp}
      className="h-[45px] px-4 bg-[#2f7e94] text-white rounded-md mt-6 cursor-pointer hover:bg-[#256b7d] transition duration-300"
    >
      Generate OTP
    </button>
  ) : (
    <button
      type="button"
      onClick={handleVerifyOtp}
      className="h-[45px] px-4 bg-green-600 text-white rounded-md mt-6 cursor-pointer hover:bg-green-700 transition duration-300"
    >
      Verify OTP
    </button>
  )}
</div>



          {/* Message Display */}
          {message && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
              {message}
            </div>
          )}


          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#2f7e94] text-white px-10 py-2 rounded-md cursor-pointer hover:bg-[#25697c] hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-[#2f7e94] text-white px-10 py-2 rounded-md cursor-pointer hover:bg-[#25697c] hover:scale-105 transition-all duration-300"
            >
              Reset
            </button>

            <button
  type="button"
  onClick={() => navigate("/")}
  className="bg-[#2f7e94] text-white px-10 py-2 rounded-md cursor-pointer hover:bg-[#25697c] hover:scale-105 transition-all duration-300"
>
  Home
</button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;