import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/transactions/password/validate-token",
        {
          token,
        }
      );

      setValid(res.data.valid);
    } catch (err) {
      setValid(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/transactions/password/reset",
        {
          token,
          newPassword,
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
          "Failed to reset password"
      );
    }
  };

  if (loading) {
    return <h2>Validating token...</h2>;
  }

  if (!valid) {
    return (
      <h2 className="text-red-600">
        Invalid or Expired Token
      </h2>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 shadow rounded"
      >
        <h2 className="text-xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full"
        >
          Reset Password
        </button>

        {message && (
          <p className="mt-3">{message}</p>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;