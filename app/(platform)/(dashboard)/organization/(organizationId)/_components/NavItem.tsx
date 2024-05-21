'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Organization } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Activity, Layout, Settings } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

interface NavItemProps {
  isExpanded: boolean
  isActive: boolean
  organization: Organization
  onExpand: (id: string) => void
}

export const NavItem = ({ 
  isExpanded,
  isActive,
  organization,
  onExpand
}: NavItemProps) => {

  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: "Events",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`
    },
    // {
    //   label: "Activity",
    //   icon: <Activity className="h-4 w-4 mr-2" />,
    //   href: `/organization/${organization.id}/activity`
    // },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`
    }
  ]

  const onClick = (href: string) => {
    router.push(href)
  }

  return (
   <AccordionItem
    value={organization.id || ''}
    className="border-none text-muted-foreground rounded-full"
   >
      <AccordionTrigger
        onClick={() => onExpand(organization.id || '')}
        className={cn("flex items-center gap-x-2 p-1.5 rounded-md hover:bg-muted transition no-underline hover:no-underline",
          isActive && "bg-muted text-primary"
        )}
      >
        <div className="flex items-center gap-x-2 hover:text-primary">
          <div className="w-7 h-7 relative">
            <Image 
              fill 
              src={organization.logo}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1" >
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
      </AccordionContent>
   </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2 pl-4">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-full"/>
    </div>
  )
}
