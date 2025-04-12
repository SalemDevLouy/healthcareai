"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaCalendar } from "react-icons/fa";

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    gender: "Male",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle sign-up submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (!registerData.first_name || !registerData.last_name || !registerData.email || !registerData.password) {
      setError("First name, last name, email, and password are required.");
      setLoading(false);
      return;
    }
    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("../api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          email: registerData.email,
          phone: registerData.phone || null,
          password: registerData.password,
          dateOfBirth: registerData.dateOfBirth || null,
          gender: registerData.gender || null,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setRegisterData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          dateOfBirth: "",
          gender: "Male",
        });
        setError("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Failed to register. Please try again.");
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="w-full max-w-lg bg-white rounded-[30px] shadow-2xl p-10 m-5">
        <form onSubmit={handleSignUp} className="w-full">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Register as Patient
          </h1>

          <div className="flex gap-3 my-6">
            <div className="relative flex-1">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={registerData.first_name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <FaUser />
              </span>
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={registerData.last_name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <FaUser />
              </span>
            </div>
          </div>

          <div className="relative my-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FaEnvelope />
            </span>
          </div>

          <div className="relative my-6">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FaPhone />
            </span>
          </div>

          <div className="relative my-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FaLock />
            </span>
          </div>

          <div className="relative my-6">
            <input
              type="date"
              name="dateOfBirth"
              value={registerData.dateOfBirth}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FaCalendar />
            </span>
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                filter: invert(0.6);
                cursor: pointer;
              }
            `}</style>
          </div>

          <div className="my-6">
            <label className="block text-gray-800 mb-2">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={registerData.gender === "Male"}
                  onChange={handleChange}
                  disabled={loading}
                  className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-blue-600 checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1 checked:after:left-1"
                />
                Male
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={registerData.gender === "Female"}
                  onChange={handleChange}
                  disabled={loading}
                  className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-blue-600 checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:top-1 checked:after:left-1"
                />
                Female
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center my-4">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 hover:scale-105 hover:shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;