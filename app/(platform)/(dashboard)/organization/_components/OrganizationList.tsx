'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation'
import {
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { toast as sonner } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrganization } from "@/actions/organization.actions";
import { Organization } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/global/Loading";
import { useLocalStorage } from "usehooks-ts"
import { useOrganization } from "@/providers/organization-provider";


type Props = {
  organizations: Organization[],
  storageKey?: string
}

export const OrganizationList = ({organizations, storageKey = 'gidi-sidebar-state'}: Props) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
  const [loading, setLoading] = useState(false)
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string>()
  const {setOrganizations} = useOrganization()
  const { toast } = useToast()
  const router = useRouter()

  if(!organizations.length) {
    redirect('/organization/create')
  }

  setOrganizations(organizations)

  return (
    <AlertDialog>
      <Card x-chunk="dashboard-06-chunk-0" >
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>
            Create and Manage your organizations.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 overflow-y-scroll ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span>Logo</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {organizations.map((organization) => (
                <TableRow 
                  className="cursor-pointer"
                  key={organization.id}
                  onClick={() => {
                  const activeOrganizationId = organization.id || ''
                  setExpanded((curr: any) => ({
                    ...curr,
                    [activeOrganizationId]: true,
                  }))
                  router.push(`/organization/${organization.id}`) 
                }}>
                   {/* <div > */}
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={organization.logo} // Replace with actual image source
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {organization.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link
                              href={`/organization/${organization.id}`} 
                              >
                              <DropdownMenuItem 
                              className="cursor-pointer flex justify-center"
                              onClick={() => {
                                const activeOrganizationId = organization.id || ''
                                setExpanded((curr: any) => ({
                                  ...curr,
                                  [activeOrganizationId]: true,
                                }))
                              }}
                              >
                                View
                              </DropdownMenuItem>
                            </Link>
                            
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => setCurrentOrganizationId(organization.id)}
                              >
                                <AlertDialogTrigger className="w-full" >Delete</AlertDialogTrigger>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    {/* </div> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
          <div className="text-sm font-medium text-muted-foreground py-2"> 
            <Link
              href="/organization/create"
            >
              <Button variant="outline" size="sm" ><Plus className="pr-2 h-6 w-6"/> Create new organization </Button>
            </Link>
          </div>
        </CardFooter> */}
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the
            Organization account and all Events under it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={async () => {
              try {
                setLoading(true)
                await deleteOrganization(currentOrganizationId || '')
                sonner('Deleted File', {
                  description: 'Successfully deleted the organization',
                })
                setLoading(false)
              } catch (error) {
                toast({
                  variant: 'destructive',
                  title: 'Oppse!',
                  description: 'could not delete your organization',
                })
              }
              
            }}
          >
           {loading ? <Loading /> : ' Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
