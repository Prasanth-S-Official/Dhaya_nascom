// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "sonner";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (pwd: string) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     return regex.test(pwd);
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let newErrors: any = {};

//     if (!email) {
//       newErrors.email = "Email is required.";
//     } else if (!validateEmail(email)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!password) {
//       newErrors.password = "Password is required.";
//     } else if (!validatePassword(password)) {
//       newErrors.password =
//         "Must be 8+ characters, include upper & lowercase, number, special character.";
//     }

//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password.";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const { data, error } = await supabase.auth.signUp({ email, password });

//       console.log("Supabase signup response:", { data, error });

//       if (error) {
//         setErrors({ email: "Signup failed: " + error.message });
//         return;
//       }

//       if (data?.user?.identities?.length === 0) {
//         toast.warning("Email already registered. Please signup with a new email.");
//         return;
//       }

//       toast.success("Confirmation email sent. Please check your inbox.");
//       navigate("/login");
//     } catch (err) {
//       console.error("Unexpected error during signup:", err);
//       setErrors({ email: "Unexpected error occurred." });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         {/* Logo */}
//         <img
//           src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
//           alt="Logo"
//           className="h-16 mx-auto mb-4"
//         />

//         <h1 className="text-center text-3xl font-bold text-indigo-600 mb-2">
//           Telangana AI Rising Grand Challenge
//         </h1>
//         <h2 className="text-xl font-semibold mb-4 text-center">Create an Account</h2>

//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <input
//               className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Email ID"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <input
//               type="password"
//               className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && (
//               <p className="text-red-600 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           <div>
//             <input
//               type="password"
//               className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded text-white font-semibold transition bg-indigo-600 hover:bg-indigo-700"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Link to Login */}
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-medium hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Must be 8+ characters, include upper & lowercase, number, special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setErrors({ email: "Signup failed: " + error.message });
        return;
      }

      if (data?.user?.identities?.length === 0) {
        toast.warning("Email already registered. Please signup with a new email.");
        return;
      }

      toast.success("Confirmation email sent. Please check your inbox.");
      navigate("/login");
    } catch (err) {
      setErrors({ email: "Unexpected error occurred." });
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

      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <img
            src="https://s3.amazonaws.com/prod-users-asset/email-uploads/d12733e5-2c1f-4b3b-b777-c1e70d74dfce/ET%20LOGO%20F1.png"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
            Create an Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 transition duration-300 bg-transparent"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 transition duration-300 bg-transparent"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
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
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
