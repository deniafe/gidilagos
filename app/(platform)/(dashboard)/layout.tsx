import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server';
import OrganizationProvider from '@/providers/organization-provider';
import OrganizationEventProvider from '@/providers/organization-event-provider';


function DashboardLayout({children} : {children: React.ReactNode}) {

  const { userId } = auth(); 

  if (!userId) return redirect('/sign-in'); 

  return (
    <div className="h-full" >
      <OrganizationProvider>
        <OrganizationEventProvider>
           {children}
        </OrganizationEventProvider>
      </OrganizationProvider>
    </div>
  )
}

export default DashboardLayout 