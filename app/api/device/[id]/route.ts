import { NextResponse,NextRequest } from 'next/server'
import {db} from '../../../../lib/db'

export async function GET(request:NextRequest) {
  const userId = await request.url.split('device/')[1]
  const result = await db.userDevices.findMany({
    where:{
      user_id:userId
    }
  })
  return NextResponse.json(result)
}
export async function POST(request: NextRequest) {
  const userId = await request.url.split('device/')[1]
  const { imei, car}:
    { 
      imei: string,
      car: string
    } = await request.json();

const AddDevice = await db.userDevices.create({

      data: {
          imei: imei,
          car: car,
          user_id: userId
      },
    })

    return NextResponse.json({ "message": "Imei Added succesfuly" })
    
  }
  export async function DELETE(request: NextRequest) {
  const imei = await request.url.split('device/')[1]
  try {
    
    //virify imei
    const existingdeviceByImei = await db.userDevices.findUnique({
      where: {
        imei: imei
      }
    });
    //delete imei device
    const deleteDevice = await db.userDevices.delete({
      where: {
        imei: imei
      }
    })
    return NextResponse.json({ message: "OK", status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: "something went wrong", error })
  }
}
