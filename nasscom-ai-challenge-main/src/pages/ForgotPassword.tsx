import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbmZlb2FzZWllcGpsd3hmeHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODcyODIsImV4cCI6MjA1OTM2MzI4Mn0.8fLJtZi1siljidzfvXw4wrErtP8_QmxbZoaW9EuKX50';

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const generatedOtp = generateOTP();
    setOtp(generatedOtp);
    localStorage.setItem("otp", generatedOtp);
    localStorage.setItem("reset-email", email);
    localStorage.setItem("new-password", newPassword);
   

    try {
      const res = await fetch("https://gmnfeoaseiepjlwxfxwz.supabase.co/functions/v1/send-otp", {
        method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      },
        body: JSON.stringify({ email, otp: generatedOtp }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!");
      setStep("otp");
    } catch (err: any) {
      toast.error("Error sending OTP: " + err.message);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");
    const storedEmail = localStorage.getItem("reset-email");
    const newPassword = localStorage.getItem("new-password");
  
    if (userOtp !== storedOtp) {
      toast.error("Invalid OTP");
      return;
    }
  
    try {
      console.log("helo");
      const res = await fetch("https://gmnfeoaseiepjlwxfxwz.supabase.co/functions/v1/update-password", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey
        },
          body: JSON.stringify({
            email: storedEmail,
            newPassword: newPassword,
          }),
        });
  
      const result = await res.json();
      console.log(res);
  
      if (!res.ok) {
        throw new Error(result.error || "Failed to update password");
      }
  
      toast.success("Password updated successfully!");
      localStorage.removeItem("otp");
      localStorage.removeItem("reset-email");
      localStorage.removeItem("new-password");
      navigate("/login");
    } catch (err: any) {
      toast.error("Failed to update password: " + err.message);
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

      {/* Right Side */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <img
            src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
            {step === "form" ? "Forgot Password?" : "Enter OTP"}
          </h2>

          <form onSubmit={step === "form" ? handleSendOTP : handleVerifyOTP} className="space-y-6">
            {step === "form" ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 bg-transparent"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 bg-transparent"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 bg-transparent"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 bg-transparent"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              {step === "form" ? "Send OTP" : "Verify OTP & Reset Password"}
            </button>
          </form>

          {step === "form" && (
            <p className="text-center mt-6 text-sm text-gray-600">
              Remembered your password?{" "}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Back to Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
