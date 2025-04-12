"use client"
import React from 'react'
import UserTable from "../../../components/UserTable";
const UsersSettings = () => {
  return (
    <div >
      <h1 className='text-4xl sm:text-6xl mb-10 border-b-4 border-blue-800 pb-4'>Gestion Users :</h1>
      <UserTable />
    </div>
  )
}

export default UsersSettings
