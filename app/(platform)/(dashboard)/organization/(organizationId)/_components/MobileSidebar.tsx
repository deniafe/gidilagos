import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/global/Logo"
import { Sidebar } from "./Sidebar"



export const MobileSidebar = () => {

  return (
    <>
       <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid items-start px-2 text-sm lg:px-4">
              <Logo />
              <Sidebar />
            </nav>
          </SheetContent>
        </Sheet>
    </>
  )
}
