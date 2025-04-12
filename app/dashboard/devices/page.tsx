"use client"
import React from 'react'
import  DevicesTable from "../../../components/DevicesTable";
const UsersSettings = () => {
  return (
    <div >
      <h1 className='text-4xl sm:text-6xl mb-10 border-b-4 border-blue-800 pb-4'>All Devices:</h1>
      <DevicesTable/>
    </div>
  )
}

export default UsersSettings
