import { NextResponse,NextRequest } from 'next/server'
import {db} from '../../../lib/db'
export async function GET() {
  // const res = await getUsers()
  const result = await db.users.findMany()
  return NextResponse.json(result)
}

export async function PUT(request: NextRequest) {
  const { id, full_name, email, phone_number }:
    { id: string, full_name: string, email: string, phone_number: string } = await request.json()
const updateUser = await db.users.update({
  where: {
    id: id,
      },
      data: {
          full_name: full_name,
          email: email,
          phone_number: phone_number,
          updated_at: new Date()
      },
    })

    return NextResponse.json({ "message": "User Updated succesfuly" })
    
  }

