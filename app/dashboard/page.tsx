import {getServerSession} from 'next-auth'
import { authOptions } from '@/lib/authOptions';
import { cookies } from 'next/headers'
const Dashboard =async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=''>
      Welcome {session?.user.username}
      <p> username : {session?.user.username}</p>
      <p> user id : {session?.user.id}</p>
      <p> email : {session?.user.email}</p>
      <p> phone : {session?.user.phone}</p>
      <p> role : {session?.user.role}</p>
    </div>
  )
}

export default Dashboard
