"use client"
import { useSession } from "next-auth/react"
import { useState } from 'react';
import {
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// icons 
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
export default function SideBar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <div className="h-[calc(100vh-5rem)] w-[60px] md:w-full md:max-w-[13rem] shadow-xl shadow-blue-gray-900/5 p-2
     text-blue-800 bg-gray-200 dark:text-white dark:bg-blue-950 rounded-none rounded-r-xl drop-shadow-md mt-1">
      
      <div className='flex flex-col gap-2'>
        
      <Link href='/dashboard'>
        <div
            className={`rounded-xl flex gap-2 p-3 items-center ${pathname === "/dashboard" ?
              "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50" : "bg-slate-300 dark:bg-blue-900"}`}
        >
            <div>
                <DashboardIcon  />
            </div>
            <div className="hidden md:block">
                Dashboard
            </div>
        </div>
        </Link>

      <Link href='/dashboard/profile'>
        <div
            className={`rounded-xl flex gap-2 p-3 items-center ${pathname === "/dashboard/profile" ?
              "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50" : "bg-slate-300 dark:bg-blue-900"}`}
        >
            <div>
                <PresentationChartBarIcon className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
                My profile
            </div>
        </div>
        </Link>
     
      

        
      <Link href='/dashboard/mydevices'>
        <div
            className={`rounded-xl flex gap-2 p-3 items-center ${pathname === "/dashboard/mydevices" ?
              "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50" : "bg-slate-300 dark:bg-blue-900"}`}
        >
            <div>
                <TrackChangesIcon className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
                My Devices
            </div>
        </div>
        </Link>
         {status === "authenticated" && session?.user.role === 'admin' ?
      <>
      <p>Admin</p>
      <Link href='/dashboard/users'>
        <div
            className={`rounded-xl flex gap-2 p-3 items-center ${pathname === "/dashboard/users" ?
              "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50" : "bg-slate-300 dark:bg-blue-900"}`}
        >
            <div>
                <PeopleAltIcon className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
               All Users
            </div>
        </div>
          </Link>

        <Link href='/dashboard/devices'>
          <div
              className={`rounded-xl flex gap-2 p-3 items-center ${pathname === "/dashboard/devices" ?
                "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-50" : "bg-slate-300 dark:bg-blue-900"}`}
          >
              <div>
                  <PeopleAltIcon className="h-5 w-5" />
              </div>
              <div className="hidden md:block">
                  All Devices
              </div>
          </div>
            </Link>
            </>
          :''
        }
        
      </div>
    </div>
  );
}

























