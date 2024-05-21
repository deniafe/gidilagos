'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"
import React, { useEffect } from 'react'
import { ModeToggle } from '@/components/global/ModeToggle'
import { MobileSidebar } from './MobileSidebar'
import { Logo } from '@/components/global/Logo'
import { useOrganization } from '@/providers/organization-provider'
import Image from 'next/image'

export const Navbar = () => {
  
  const { theme } = useTheme()
  const { getCurrentOrganization } = useOrganization()

  const currentOrg = getCurrentOrganization()

  return (
    <nav className="z-[1] fixed top-0 w-full py-2 px-4 shadow-sm bg-secondary flex items-center lg:py-4">
      {/* Mobile Sidebar */}
      <div className=" flex items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size="sm" asChild>
          <div>
           <Plus size={16}/>
            <span className="hidden md:flex" >New Event</span>
          </div>
        </Button>
       </div>
       <div className="ml-auto flex items-center gap-x-2">
        <div className="flex text-muted-foreground font-medium text-sm pr-2">
          <Image 
            src={currentOrg?.logo || ''} 
            alt={'Organization Logo'} 
            width={20}
            height={20}
            className='rounded'
            ></Image>
            <span className="pl-1">
              {currentOrg?.name}
            </span>
        </div>
           <UserButton appearance={{
              baseTheme: theme === 'dark' ? dark : undefined, 
              elements: {
                avatarBox: {height: 30, width: 30}
              }
              }}
             />
          <ModeToggle />
        </div>
    </nav>
  )
}
