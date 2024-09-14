'use client'
import { Logo } from '@/components/global/Logo';
import { ModeToggle } from '@/components/global/ModeToggle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useTheme } from "next-themes";
import { MobileSidebar } from './MobileNavbar';
import { CustomUserDropdown } from '@/components/global/CustomUserButton';


export const Navbar = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  
  return (
    <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex items-center md:py-4">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">

        <Button size="sm" asChild>
          <Link href="/create-event">
            <Plus size={16} />
            <span className="hidden md:flex">Create Event</span>
          </Link>
        </Button>
        {
          user ?
           <CustomUserDropdown />
            :
            <Button className="hidden md:inline-block" size="sm" variant="outline" asChild>
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
        }
        <ModeToggle />
      </div>
    </nav>
  );
};
