import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const exchangeSession = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.hash);

      if (error || !data?.session) {
        toast.error("Session not found. Please use the reset link again.");
        navigate("/forgot-password");
        return;
      }

      const userResponse = await supabase.auth.getUser();
      if (userResponse.error || !userResponse.data?.user) {
        toast.error("Unable to fetch user. Please try again.");
        navigate("/forgot-password");
        return;
      }

      setEmail(userResponse.data.user.email);
    };

    exchangeSession();
  }, [navigate]);

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!newPassword) newErrors.newPassword = "New password is required.";
    else if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must be 8+ chars, include upper/lowercase, number, special char.";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      toast.error("Failed to update password: " + error.message);
    } else {
      toast.success("Password updated successfully!");
      navigate("/login");
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

      {/* Right Side - Reset Password Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <img
            src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
            Reset Your Password
          </h2>

          {email && (
            <p className="text-sm text-center text-gray-500 mb-4">
              Resetting password for: <span className="font-medium">{email}</span>
            </p>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 transition duration-300 bg-transparent"
              />
              {errors.newPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 transition duration-300 bg-transparent"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
