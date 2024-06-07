'use client'

import { Button } from "@/components/ui/button"
import { Mail, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from "react";
import { Loading } from "@/components/global/Loading";
import { createEmail, updateEmail } from "@/Firebase/email.queries";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Email, EmailTemplate } from "@/lib/types";
import { useRouter } from "next/navigation";
import { PickEmailTemplateButton } from "./PickEmailTemplateButton";

type Props = {
  data?: Partial<Email>
  update?: boolean
};

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Email name must be at least 2 characters.' }),
  description: z.string().optional(),
});

export const CreateEmailButton = ({ data, update }: Props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [template, setTemplate] = useState<EmailTemplate>({} as EmailTemplate)

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: data?.name || '',
        description: data?.description || '',
      },
    });
    const isLoading = form.formState.isSubmitting;
  
    useEffect(() => {
      if (data) {
        form.reset(data);
      }
    }, [data]);  

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
      try {
        const emailData = {
          name: values.name,
          description: values.description,
          content: '',
          json: template.content || ''
        };
  
        if (data?.id) {
          await updateEmail(data.id, emailData);
          setIsOpen(false)
          return toast('✅ Email Updated');
        } else {
          const res = await createEmail(emailData);
          if (res.result) {
              toast('✅ Email Created');
              setIsOpen(false)
              console.log('Email has been created!!!!!!!!!!!!!!!!!!!!!!!!', res.result.id)
              return router.push(`/editor/email/${res.result.id}`)
          }
        }
      } catch (error) {
        console.log(error);
        toast('⛔ Oops!', { description: 'Could not create or update your email' });
      }
    }
  

  return (
    <div className="text-sm font-medium text-muted-foreground"> 
       {update ? 
       <Button variant={'outline'} size={'icon'} onClick={() =>  setIsOpen(true)}>
          <Pencil className='h-[1rem] w-[1rem]'/>
        </Button> 
       : <Button 
          variant="outline" 
          size="sm" 
          onClick={() =>  setIsOpen(true)}
          >
            <Mail className="pr-2 h-6 w-6"/> 
            Create new email 
        </Button>}
        <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
      >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">{update ? `Edit Email` : `New Email!`}</DialogTitle>
            <DialogDescription className="text-center pt-2">
              {!update && `Create new email newsletter`}
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Email name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe the email"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {!update && <PickEmailTemplateButton setTemplate={setTemplate} template={template}/> }   

                <div className="flex justify-center pt-2 pb-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loading /> : 'Save Email'}
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
