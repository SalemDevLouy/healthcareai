"use client"
import React from 'react'
import  MyDevicesTable from "../../../components/MyDevicesTable";
const UsersSettings = () => {
  return (
    <div >
      <h1 className='text-4xl sm:text-6xl mb-10 border-b-4 border-blue-800 pb-4'>My Devices:</h1>
      <MyDevicesTable/>
    </div>
  )
}

export default UsersSettings
