import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// ================= TOKEN CHECK =================
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

// ================= GET TOKEN =================
export const getToken = async () => {
  let token = localStorage.getItem("token");

  // Existing token valid
  if (token && !isTokenExpired(token)) {
    return token;
  }

  // Login again if token expired
  const response = await API.post("/api/auth/login", {
    username: "RAVI KUMAR",
    password: "54321",
  });

  console.log("LOGIN RESPONSE =", response.data);

  // IMPORTANT FIX
  token = response.data.jwt;

  localStorage.setItem("token", token);

  return token;
};

// ================= GENERIC API CALL =================
export const getWithAuth = async (url, options = {}) => {
  const token = await getToken();

  return API({
    url,
    method: options.method || "GET",
    data: options.data || {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// ================= FEEDBACK APIs =================

// Generate OTP
export const generateOtpApi = async (data) => {
  try {
    const token = await getToken();  // 👈 ADD THIS
    const response = await API.post("/api/generate-otp", data, {
      headers: {
        Authorization: `Bearer ${token}`,  // 👈 ADD THIS
      },
    });
    return response;
  } catch (error) {
    console.error("Generate OTP error:", error);
    throw error;
  }
};
/*export const generateOtpApi = async (data) => {
  try {
    const response = await API.post("/api/generate-otp", data);
    return response;
  } catch (error) {
    console.error("Generate OTP error:", error);
    throw error;
  }
}; */


// Verify OTP
export const verifyOtpApi = async (data) => {
  try {
    const token = await getToken();  // ← ADD THIS
    const response = await API.post("/api/verify-otp", data, {
      headers: {
        Authorization: `Bearer ${token}`,  // ← ADD THIS
      },
    });
    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};
/* export const verifyOtpApi = async (data) => {
  try {
    const response = await API.post("/api/verify-otp", data);
    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
}; */


// Feedback Data API
export const feedbackDataApi = async (data) => {
  return getWithAuth("/api/feedback-data", {
    method: "POST",
    data,
  });
};


// Submit Complaint
export const submitComplaintApi = async (data) => 
{
 
 const token = await getToken();

  return API.post("/api/submit-complaint", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }); 

};

export default API;