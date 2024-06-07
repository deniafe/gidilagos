'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import {Code, MoreHorizontal, Trash} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
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
import { Email } from "@/lib/types";
import { Loading } from "@/components/global/Loading";
import { deleteEmail, getEmails } from "@/Firebase/email.queries";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { CreateEmailButton } from "./CreateEmailButton";
import { formatDate, truncateString } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const EmailList = () => {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(false)
  const [currentEmailId, setCurrentEmailId] = useState<string>()
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter()

  const getAllEmails = async (initial = false) => {
    setLoading(true);
    const allEmails = await getEmails( 8, initial ? null : lastVisible);
    if (allEmails.error) {
      setLoading(false);
      return toast('⛔ Oops!', { description: 'Could not get emails' });
    }

    const newEmails: Email[] = allEmails.emails;
    setEmails((prevEmails) => initial ? newEmails : [...prevEmails, ...newEmails]);
    setLastVisible(allEmails.lastVisible);
    setHasMore(newEmails.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    getAllEmails(true);
  }, []);

  const handleShowMore = () => {
    if (hasMore) {
        getAllEmails();
    }
  };

  const delEmail = (emailId: string) => {
    setEmails((prevEmails) => prevEmails.filter(event => event.id !== emailId));
  }

  return (
    <AlertDialog>
      <Card className="border-none w-full" >
        <CardHeader>
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Emails</h1>
                <CreateEmailButton />
            </div>
         
          {/* <CardDescription>
            Create and Manage your organizations.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="h-80 mt-8 overflow-y-scroll ">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="hidden w-[100px] sm:table-cell">
                  <span>Logo</span>
                </TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id}>
                  {/* <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={organization.logo} // Replace with actual image source
                      width="64"
                    />
                  </TableCell> */}
                  <TableCell className="font-medium">
                    {email.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-medium">
                    {truncateString(email.description || '', 30)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                   {formatDate(email.createdAt)}
                  </TableCell>
                  <TableCell className="flex ">
                    <CreateEmailButton data={email} update />
                    <Button className='ml-2' variant={'outline'} size={'icon'} onClick={() =>  router.push(`/editor/email/${email.id}`)}>
                      <Code className='h-[1rem] w-[1rem]'/>
                    </Button> 
                    <Button size={'icon'} variant={'outline'} className='ml-2' onClick={() => setCurrentEmailId(email.id)} >
                      <AlertDialogTrigger>
                        <Trash className='h-[1rem] w-[1rem] text-destructive' />
                      </AlertDialogTrigger>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete this email.
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
                await deleteEmail(currentEmailId || '')
                delEmail(currentEmailId || '')
                toast('Deleted File', {
                  description: 'Successfully deleted the email',
                })
                setLoading(false)
              } catch (error) {
                toast('⛔ Oops!', { description: 'Could not delete email' })
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
