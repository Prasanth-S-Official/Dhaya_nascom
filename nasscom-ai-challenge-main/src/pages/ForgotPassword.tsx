import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setError("Enter a valid email.");
      return;
    }

    const otp = generateOTP();
    localStorage.setItem("otp", otp);
    localStorage.setItem("reset-email", email);
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbmZlb2FzZWllcGpsd3hmeHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODcyODIsImV4cCI6MjA1OTM2MzI4Mn0.8fLJtZi1siljidzfvXw4wrErtP8_QmxbZoaW9EuKX50';


    try {
      const res = await fetch("https://gmnfeoaseiepjlwxfxwz.supabase.co/functions/v1/send-otp", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!");
      navigate("/verify-otp"); // 👈 redirect to OTP entry page (you create this)
    } catch (err: any) {
      toast.error("Error sending OTP: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-green-600 text-3xl md:text-5xl font-bold uppercase tracking-tight font-anton">
            Telangana <br /> AI Rising Grand Challenge
          </h1>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <img
            src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
            Forgot Password?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 transition duration-300 bg-transparent"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Send OTP
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
