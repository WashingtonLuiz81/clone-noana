import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions)
  const IdToken = session?.AuthenticationResult?.IdToken;
 
  if (!session) {
    redirect('/')
  }

  const res = await fetch('https://admin.hml.noana.link/v1/person/person', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${IdToken}`, 
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return (
    <div>
      <div>Olá, {data[0].name}</div>
      <div>Dashboard Profile: {data[0].profile}</div>
    </div>
  )
}
