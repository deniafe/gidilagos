'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserCheck, Hospital, Mail, Users, LayoutTemplate, CalendarDays } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"


export const Sidebar = () => {

    const router = useRouter()
    const pathname = usePathname()
  
    const routes = [
      {
        label: "Events",
        icon: <CalendarDays className="h-4 w-4 mr-2" />,
        href: `/admin`
      },
      // {
      //   label: "Organizations",
      //   icon: <Hospital className="h-4 w-4 mr-2" />,
      //   href: `/admin/organizations`
      // },
      {
        label: "Emails",
        icon: <Mail className="h-4 w-4 mr-2" />,
        href: `/admin/emails`
      },
      {
        label: "Emails Templates",
        icon: <LayoutTemplate className="h-4 w-4 mr-2" />,
        href: `/admin/email-templates`
      }
    ]
  
    const onClick = (href: string) => {
      router.push(href)
    }

  return (
    <>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm lg:px-4">
          <div
              className="flex items-center font-bold gap-6 rounded-lg px-3 py-8 text-muted-foreground transition-all hover:text-primary"
            >
              <UserCheck />
              Admin
            </div>
            {
                routes.map((route) => (
                <Button
                    key={route.href}
                    size="sm"
                    onClick={() => onClick(route.href)}
                    className={cn(
                    "w-full font-normal justify-start pl-10 mb-1 hover:text-primary",
                    pathname === route.href && "bg-muted text-primary"
                    )} 
                    variant="ghost"
                >
                    {route.icon}
                    {route.label}
                </Button>
                ))
            }
          </nav>
        </div>
    </>
  )
}

