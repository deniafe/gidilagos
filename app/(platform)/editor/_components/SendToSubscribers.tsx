'use client'
import { Button } from "@/components/ui/button"
import { FileJson } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from  "@/components/ui/textarea";
import { SendEmailParams, sendEmail } from "@/actions/email.action";
import { Loading } from "@/components/global/Loading";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { getAllSubscribers } from "@/Firebase/email.queries";

type Props = {
  saveEmail: () => Promise<void>
  exportData: () => Promise<{
    json: any;
    html: string;
}>
};

const FormSchema = z.object({
  subject: z.string().min(2, { message: 'Email subject must be at least 2 characters.' }),
  from: z.string().min(2, { message: 'Must be at least 2 characters.' }),
});

export const SendToSubscribers = ({ saveEmail, exportData }: Props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [subscribers, setSubscribers] = useState<string[]>([])
    const [currentEmailId, setCurrentEmailId] = useState<string>()
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
    });


    const getSubscribers = async (initial = false) => {
        const data = await getAllSubscribers( 10, initial ? null : lastVisible);

        if (data.error) {
            return toast('⛔ Oops!', { description: 'Could not get subscribers' });
        }
        
        const subbies = data.subscribers
        const emails = subbies.map(subscription => subscription.email)
        setLastVisible(data.lastVisible)
        setHasMore(subbies.length > 0)
        toast('✅ Subscribers extracted successfully')
        return emails
    };
   
    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        setIsLoading(true)
        
        await saveEmail() 
        
        const { json, html } = await exportData();

        const recipients = await getSubscribers()

        if(Array.isArray(recipients)) {
            const emailData: SendEmailParams = {
                to: recipients,
                from: `${values.from} - Gidiopolis <${values.from.toLocaleLowerCase()}@gidiopolis.com>`,
                subject: values.subject,
                htmlContent: html
            };
        
            const response = await sendEmail(emailData);
            const res = JSON.parse(response)
            if(res.data) {
               toast('✅ Test emails sent successfully')
            }
    
            if(res.error) {
                toast('⛔ Oppse!', {description: 'There was an error sending test emails'})
            }
        }
        
        setIsLoading(false)
        setIsOpen(false)
    };

  return (
    <div> 
        <Button size="sm"  onClick={() =>  setIsOpen(true)}>
           <FileJson className='h-4 w-4 mr-2' />
            Send Email To Subscribers
        </Button>
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
        >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">Send Email To Subscribers!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Send email to all Gidiopolis subscribers
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                disabled={isLoading}
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Welcome to Gidiopolis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input placeholder="Admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <div className="flex justify-center pt-6 pb-4">
                  <Button disabled={isLoading} type="submit">
                  {isLoading ? <Loading /> : 'Send Email'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
