'use client'

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"
import { Package2 } from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "usehooks-ts"
import { Accordion } from "@/components/ui/accordion"
import { NavItem } from "./NavItem"
import { useOrganization } from "@/providers/organization-provider"

interface SidebarProps {
  storageKey?: string
}

export const Sidebar = ({storageKey = 'gidi-sidebar-state'}: SidebarProps) => {

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

  const { isLoading, currentOrganizationId: activeOrganizationId, organizations: userMemberships } = useOrganization();


  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if(expanded[key]) {
        acc.push(key)
      }
      return acc
    }, [])

    const onExpand = (id: string) => {
      setExpanded((curr) => ({
        ...curr,
        [id]: !expanded[id],
      }))
    }
    

    if(isLoading ) {
      return (
        <>
        <div className="flex items-center font-bold gap-12 rounded-lg px-3 py-8 text-muted-foreground transition-all hover:text-primary">
          <Skeleton className="h-10 w-[60%] rounded-full"/>
          <Skeleton className="h-10 w-10 rounded-full"/>
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
        </>
      )
    }

  return (
    <>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm lg:px-4">
          <Link
              href="/organization"
              className="flex items-center font-bold gap-12 rounded-lg px-3 py-8 text-muted-foreground transition-all hover:text-primary"
            >
              <Package2 />
              Organizations
              <Button 
                asChild
                type="button"
                size="icon"
                variant="ghost"
              >
                <Plus className="h-5 w-5" />
              </Button>
              
            </Link>
            <Accordion
              type="multiple"
              defaultValue={defaultAccordionValue}
              className="space-y-2" 
            >
              {userMemberships.map((organization) => (
                <NavItem 
                  key={organization.id}
                  isActive={activeOrganizationId === organization.id}
                  // isExpanded={activeOrganizationId === organization.id}
                  isExpanded={expanded[organization.id || '']}
                  organization={organization}
                  onExpand={onExpand}
                />
              ))}
            </Accordion>
          </nav>
        </div>
    </>
  )
}

