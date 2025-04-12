"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaClock, FaNoteSticky } from "react-icons/fa6";

const AppointmentForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    familyFname: "",
    familyLname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Prefill email and phone from session
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || "",
        phone: session.user.phone || "",
      }));
    }
    if (status === "unauthenticated") {
      setMessage("Please log in to book an appointment.");
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [status, session, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      setMessage("Email is required.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: session?.user?.id ? parseInt(session.user.id) : null,
          familyFname: formData.familyFname || null,
          familyLname: formData.familyLname || null,
          email: formData.email,
          phone: formData.phone || null,
          date: formData.date || null,
          time: formData.time || null,
          notes: formData.notes || null,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("Appointment booked successfully! Waiting for confirmation.");
        setIsSuccess(true);
        setFormData({
          familyFname: "",
          familyLname: "",
          email: session?.user?.email || "",
          phone: session?.user?.phone || "",
          date: "",
          time: "",
          notes: "",
        });
      } else {
        setMessage(`Booking failed: ${data.message}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl p-8 m-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Appointment</h1>
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Book for You or a Family Member
              </h2>
              <p className="text-gray-600 mb-4">
                Our Health AI+ platform makes booking appointments quick and easy. Schedule a visit for yourself or a loved one in minutes.
              </p>
              <p className="text-gray-600">
                Or call us at{" "}
                <a href="tel:+213726250400" className="text-blue-600 hover:underline">
                  +213 726 25 04 00
                </a>
              </p>
            </div>

            {/* Right Section - Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Appointment Details
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      name="familyFname"
                      placeholder="Family First Name"
                      value={formData.familyFname}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaUser />
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      name="familyLname"
                      placeholder="Family Last Name"
                      value={formData.familyLname}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaUser />
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaEnvelope />
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaPhone />
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
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
                  <div className="relative flex-1">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaClock />
                    </span>
                    <style jsx>{`
                      input[type="time"]::-webkit-calendar-picker-indicator {
                        filter: invert(0.6);
                        cursor: pointer;
                      }
                    `}</style>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 pl-10 bg-gray-100 rounded-lg outline-none text-gray-800 placeholder-gray-500 disabled:opacity-50 resize-y min-h-[100px]"
                  />
                  <span className="absolute left-3 top-4 text-gray-500">
                    <FaNoteSticky />
                  </span>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 hover:scale-105 hover:shadow-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </button>

                {message && (
                  <p
                    className={`text-center mt-4 ${
                      isSuccess ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AppointmentForm;