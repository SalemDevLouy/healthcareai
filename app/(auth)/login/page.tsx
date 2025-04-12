"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// import { FaEnvelope, FaLock } from "react-icons/fa";

// Interface for user data stored in the cookie
interface UserData {
  id: string;
  email: string;
  username?: string;
}

// Interface for login form data
interface LoginFormData {
  email: string;
  password: string;
}

// Helper function to get a cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
};

// Helper function to remove a cookie
const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const userData: UserData = JSON.parse(userCookie);
        console.log("User already logged in:", userData);
        router.push("/dashboard");
      } catch (error) {
        console.error("Invalid user cookie:", error);
        removeCookie("user");
      }
    }
  }, [router]);

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submission
   const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    const signInData = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    });
    if (signInData?.error) {
      console.log(signInData.error );
    } else 
    {
      router.refresh();
      router.push('/')
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-10 m-5">
        <form onSubmit={handleLogin} className="w-full">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Login</h1>
          <div className="relative my-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              disabled={loading}
              className="w-full p-3 pl-5 pr-12 bg-gray-100 rounded-lg outline-none text-base text-gray-800 font-medium placeholder-gray-500"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              {/* <FaEnvelope /> */}
            </span>
          </div>
          <div className="relative my-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              disabled={loading}
              className="w-full p-3 pl-5 pr-12 bg-gray-100 rounded-lg outline-none text-base text-gray-800 font-medium placeholder-gray-500"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              {/* <FaLock /> */}
            </span>
          </div>
          <div className="my-4 text-center">
            <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot password?
            </a>
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

export default Login;