import { NextResponse,NextRequest } from 'next/server'
import {db} from '../../../../lib/db'
export async function DELETE(request: NextRequest) {
  const userId = await request.url.split('users/')[1]
  try {
    
    //virify user id
    const existingUserById = await db.users.findUnique({
      where: {
        id: userId
      }
    });
    //delete user
    const deleteUser = await db.users.delete({
      where: {
        id: userId
      }
    })
    return NextResponse.json({ message: "OK", status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: "something went wrong", error })
  }
}