// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "sonner";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors: any = {};
//     if (!email) newErrors.email = "Email is required.";
//     else if (!validateEmail(email)) newErrors.email = "Enter a valid email.";

//     if (!password) newErrors.password = "Password is required.";

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     const { error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       toast.error("Login failed: " + error.message);
//     } else {
//       toast.success("Login successful!");
//       setTimeout(() => navigate("/form/page1"), 2000);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <img
//           src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
//           alt="Logo"
//           className="h-16 mx-auto mb-4"
//         />
//         <h1 className="text-center text-3xl font-bold text-indigo-600 mb-2">
//           Telangana AI Rising Grand Challenge
//         </h1>
//         <h2 className="text-xl font-semibold mb-4 text-center">Login to your account</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <input
//               type="email"
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
//             {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Link to Signup */}
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
//             Create new Account!
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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Enter a valid email.";

    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Login successful!");
      setTimeout(() => navigate("/form/page1"), 2000);
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


      {/* Right Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <img
            src="https://media.licdn.com/dms/image/v2/C561BAQHUvXFm8t0SSQ/company-background_10000/company-background_10000/0/1623310598733/et_itec_gots_cover?e=2147483647&v=beta&t=5_SE6HWKUrJN36vtm-SNvFPahqd60i2AKh7A5IX6B4I"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
              Create new Account!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
