"use client"
import { useSession } from "next-auth/react"
import {
  DropdownItem, Dropdown, DropdownMenu, Avatar,
  DropdownTrigger,Button,
} from "@nextui-org/react";

import Image from "next/image"
import { ThemeSwitcher } from "./ThemeSwitcher";
import LogOut from './LogOut';
import Link from 'next/link'
export default function NavBar() {
  const { data: session, status } = useSession();
  
  return (
    <div className='z-10  m-0 flex w-full justify-between 
    items-center p-3 py-5 bg-gray-300 rounded-b-xl
     dark:bg-blue-950 text-blue-800 dark:text-white drop-shadow-md'>
      <div className='flex  justify-center items-center gap-3'>
       <h1 className="font-bold text-3xl">Health<span className="text-blue-500">AI</span></h1>
         
    </div>
      <div className="flex gap-4 items-center">
        <ThemeSwitcher/>
        {status === "authenticated" ? 
        <Dropdown placement="bottom-end" className=" bg-white dark:bg-blue-900 text-blue-800 dark:text-gray-200">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform mr-4 w-12 h-12 text-large"
              color="secondary"
              name="Jason Hughes"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" className="">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold"><span className='font-bold uppercase	'>{ session?.user.role} : </span>{ session?.user.username}</p>
              <p className="font-semibold">{ session?.user.email}</p>
              
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              <LogOut/>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        : <div className='flex gap-2'>
            <Link href='/login'> 
              <Button color="primary">
                Login
              </Button>
            </Link>
          <Link href='/signup'>
            <Button color="primary">
              Sign Up
            </Button>
            </Link>
        </div> }
        
        
      </div>
      
    </div>
  );
}
