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

type Props = {
  setRecipients: Dispatch<SetStateAction<string[]>>
  exportData: () => Promise<{
    json: any;
    html: string;
}>
};

const FormSchema = z.object({
  subject: z.string().min(2, { message: 'Email subject must be at least 2 characters.' }),
  from: z.string().min(2, { message: 'Must be at least 2 characters.' }),
  recipients: z.string().min(6, {message: 'At least one recipient required'}),
});

export const SendTestEmail = ({ setRecipients, exportData }: Props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
    });
   
    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
      setIsLoading(true)
        const recipients = values.recipients.split('\n').filter(line => line.trim() !== '')
        setRecipients(recipients)
        const { json, html } = await exportData();
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
          console.log('Error sending emails', res.error)
          toast('⛔ Oppse!', {description: 'There was an error sending test emails'})
        }
        
        setIsLoading(false)
        setIsOpen(false)
    };

  return (
    <div> 
        <Button size="sm" variant="outline"  onClick={() =>  setIsOpen(true)}>
           <FileJson className='h-4 w-4 mr-2' />
            Send Test Email
        </Button>
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
        >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">Send Test Email!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Send a test email to recipients
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
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="recipients"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Recient email address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="example@email.com" {...field} />
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
