'use client'
import { ModeToggle } from '@/components/global/ModeToggle'
import { Logo } from '@/components/global/Logo'
import { CustomUserDropdown } from '@/components/global/CustomUserButton'

export const Navbar = () => {

  return (
    <nav className="z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex items-center lg:py-4">
      {/* Mobile Sidebar */}
      <div className=" flex items-center gap-x-2">
        <div className="flex">
          <Logo />
        </div>
       </div>
       <div className="ml-auto flex items-center gap-x-2">
          <CustomUserDropdown />
          <ModeToggle />
        </div>
    </nav>
  )
}
