import { db } from "@/lib/db"; // Adjust path to your Prisma client
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      patientId,
      familyFname,
      familyLname,
      email,
      phone,
      date,
      time,
      notes,
    }: {
      patientId?: number | null;
      familyFname?: string | null;
      familyLname?: string | null;
      email: string;
      phone?: string | null;
      date?: string | null;
      time?: string | null;
      notes?: string | null;
    } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate patientId if provided
    if (patientId) {
      const patient = await db.patient.findUnique({
        where: { id: patientId },
      });
      if (!patient) {
        return NextResponse.json(
          { message: "Patient not found" },
          { status: 404 }
        );
      }
    }

    // Validate lengths
    if (familyFname && familyFname.length > 50) {
      return NextResponse.json(
        { message: "Family first name must be 50 characters or less" },
        { status: 400 }
      );
    }
    if (familyLname && familyLname.length > 50) {
      return NextResponse.json(
        { message: "Family last name must be 50 characters or less" },
        { status: 400 }
      );
    }
    if (phone && phone.length > 20) {
      return NextResponse.json(
        { message: "Phone number must be 20 characters or less" },
        { status: 400 }
      );
    }
    if (notes && notes.length > 255) {
      return NextResponse.json(
        { message: "Notes must be 255 characters or less" },
        { status: 400 }
      );
    }
    if (email.length > 100) {
      return NextResponse.json(
        { message: "Email must be 100 characters or less" },
        { status: 400 }
      );
    }

    // Validate date format
    let formattedDate: Date | null = null;
    if (date) {
      formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return NextResponse.json(
          { message: "Invalid date format" },
          { status: 400 }
        );
      }
    }

    // Validate and format time
    let formattedTime: Date | null = null;
    if (time) {
      // Expect time in HH:MM format
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(time)) {
        return NextResponse.json(
          { message: "Invalid time format (use HH:MM)" },
          { status: 400 }
        );
      }
      // Convert to ISO-8601 DateTime (e.g., "1970-01-01T14:30:00.000Z")
      formattedTime = new Date(`1970-01-01T${time}:00.000Z`);
      if (isNaN(formattedTime.getTime())) {
        return NextResponse.json(
          { message: "Invalid time conversion" },
          { status: 400 }
        );
      }
    }

    // Create appointment
    const newAppointment = await db.appointment.create({
      data: {
        patientId: patientId || null,
        familyFname: familyFname || null,
        familyLname: familyLname || null,
        email,
        phone: phone || null,
        date: formattedDate,
        time: formattedTime,
        notes: notes || null,
        status: "Pending",
      },
    });

    return NextResponse.json({
      appointment: newAppointment,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { 
        message: "Something went wrong", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}