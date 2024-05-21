'use client'
import { Logo } from '@/components/global/Logo'
import { ModeToggle } from '@/components/global/ModeToggle'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { UserButton } from "@clerk/nextjs"
import { useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"

export const Navbar = () => {
  const { user } = useUser()
  const { theme } = useTheme()

  return (
    <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-1/2 px-2 md:px-4 shadow-sm bg-secondary flex items-center md:py-4">
      <div className=" flex items-center gap-x-4">
        <div className="md:flex">
          <Logo />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">

      <div className="hidden md:flex">

        <Button size="sm" variant="ghost" asChild>
            <Link href="/">
              About
            </Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">
              Blog
            </Link>
          </Button>

      </div>

      <Button size="sm" asChild>
        <Link href="/organization">
          <Plus size={16}/>
          <span className="hidden md:flex" >Create Event</span>
        </Link>
      </Button>

        {/* <UserButton appearance={{
          baseTheme: theme === 'dark' ? dark : undefined, 
          elements: {
            avatarBox: {height: 30, width: 30}
          }
          }}
          /> */}
        {
              user ?
                //  <Button className="" size="icon" variant="outline">
                  <UserButton appearance={{
                      baseTheme: theme === 'dark' ? dark : undefined, 
                      elements: {
                        avatarBox: {height: 30, width: 30}
                      }
                      }}
                    />
                  // </Button>
            
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
  )
}