import React from 'react'
// import { redirect } from 'next/navigation'
// import { auth } from '@clerk/nextjs/server';
import { Navbar } from './_components/Navbar';
import { Sidebar } from './_components/Sidebar';

type Props = {
  children: React.ReactNode;
};

async function OrganizationIdLayout({ children }: Props) {

  return (
    <div className="h-full" >
      <Navbar />
      <div className="pt-20 md:pt-24 mx-auto">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default OrganizationIdLayout 