// import Image from "next/image";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// export default function Home() {
//   return (
//     <main className="">
//     </main>
//   );
// }

// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { FaUserMd, FaFileMedical, FaBrain, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Healthcare with AI
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Access your scan results, get AI-driven disease classification, and connect with physicians seamlessly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Patient Login
            </Link>
            <Link
              href="/signup"
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Patient Portal */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <FaFileMedical className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Patient Portal</h3>
              <p className="text-gray-600">
                Securely access and download your scan results, view health history, and manage your medical data.
              </p>
            </div>
            {/* Feature 2: AI Classification */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <FaBrain className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Classification</h3>
              <p className="text-gray-600">
                Upload scans for instant AI-driven classification with detailed reports and confidence scores.
              </p>
            </div>
            {/* Feature 3: Physician Consultation */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <FaUserMd className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Physician Consultation</h3>
              <p className="text-gray-600">
                Connect with nearby doctors, schedule appointments, or communicate via messaging or video.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/images/healthcare-illustration.jpg" // Placeholder image (replace with actual asset)
              alt="Healthcare Innovation"
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Transforming Healthcare
            </h2>
            <p className="text-gray-600 mb-6">
              Our platform integrates cutting-edge AI to classify diseases early, provides a user-friendly interface for patients, and fosters seamless communication with healthcare providers. With multilingual support and accessibility features, we ensure everyone can benefit from modern diagnostics.
            </p>
            <Link
              href="/about"
              className="text-blue-600 font-semibold hover:underline"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of patients using our platform to access results, get AI insights, and connect with doctors.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">HealthLab</h3>
              <p className="text-gray-400">
                Empowering patients with AI-driven healthcare solutions.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
              <Link href="/resources" className="text-gray-400 hover:text-white">
                Resources
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400">
            <p>&copy; 2025 HealthLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}