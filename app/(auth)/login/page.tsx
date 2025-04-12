"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect based on role
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("Session user:", session.user);
      const redirectPath = session.user.role === "admin" ? "/admin" : "/patient";
      router.push(redirectPath);
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        setError("Login failed: Invalid email or password.");
        console.error("SignIn error:", result.error);
        setLoading(false);
      } else if (result?.ok) {
        // Session will trigger useEffect redirect
        console.log("Login successful, awaiting session...");
      }
    } catch (error) {
      console.error("Login fetch error:", error);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8 m-5">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Login
          </h1>

          <div className="relative my-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
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
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 pl-10 pr-4 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FaLock />
            </span>
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;