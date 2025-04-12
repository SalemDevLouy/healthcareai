import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function PatientPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "patient") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Patient Dashboard</h1>
      <p className="text-gray-600">Welcome, {session.user.name}!</p>
      {/* Add patient features here */}
    </div>
  );
}