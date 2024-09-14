import React from 'react'
// import { redirect } from 'next/navigation'
// import { auth } from '@clerk/nextjs/server';
import { Navbar } from './_components/Navbar';
// import { Sidebar } from './_components/Sidebar';

type Props = {
  children: React.ReactNode;
};

async function OrganizationIdLayout({ children }: Props) {

  return (
    <div className="h-full" >
      <Navbar />
      <div className="flex justify-center pt-20 md:pt-24">
        <div className="max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  )
}

export default OrganizationIdLayout 