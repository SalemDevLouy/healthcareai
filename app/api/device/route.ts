import { NextResponse,NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid';
import {db} from '../../../lib/db'
export async function GET() {
  const result = await db.userDevices.findMany()
  return NextResponse.json(result)
}

