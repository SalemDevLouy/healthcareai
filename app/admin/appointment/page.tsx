"use client";
import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  patient_id: number;
  family_fname: string;
  family_lname: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch("/api/checkappointment");
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des rendez-vous</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Prénom</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Téléphone</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Heure</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td className="border px-4 py-2">{app.family_lname}</td>
              <td className="border px-4 py-2">{app.family_fname}</td>
              <td className="border px-4 py-2">{app.email}</td>
              <td className="border px-4 py-2">{app.phone}</td>
              <td className="border px-4 py-2">{app.date}</td>
              <td className="border px-4 py-2">{app.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAppointmentsPage;
