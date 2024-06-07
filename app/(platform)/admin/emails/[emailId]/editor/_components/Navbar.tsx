import { Logo } from '@/components/global/Logo';

export const Navbar = () => {

  return (
      <nav className="md:max-w-screen-2xl z-[1] fixed top-0 w-full py-2 px-2 md:px-4 shadow-sm bg-secondary flex justify-between items-center md:py-2">
        <div className=" flex items-center gap-x-4">
          <div className="md:flex">
            <Logo />
          </div>
        </div>
      </nav>
  )
}


