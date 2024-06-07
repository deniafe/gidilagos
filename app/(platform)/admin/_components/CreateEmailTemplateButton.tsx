'use client'
import { Button } from "@/components/ui/button"
import { LayoutTemplate, Mail, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from "react";
import { Loading } from "@/components/global/Loading";
import { createEmailTemplate, updateEmailTemplate } from "@/Firebase/template.queries";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailTemplate } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ImageUploadComponent } from "@/components/global/media/ImageUploadComponent";

type Props = {
  data?: Partial<EmailTemplate>
  update?: boolean
};

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Template name must be at least 2 characters.' }),
  previewImage: z.string().url({ message: 'Preview image must be a valid URL' }),
});

export const CreateEmailTemplateButton = ({ data, update }: Props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: data?.name || '',
        previewImage: data?.previewImage || '',
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
          const templateData = {
            name: values.name,
            previewImage: values.previewImage,
          };
    
          if (data?.id) {
            await updateEmailTemplate(data.id, templateData);
            setIsOpen(false)
            return toast('✅ Template Updated');
          } else {
            const res = await createEmailTemplate(templateData);
            if (res.result) {
               toast('✅ Template Created');
               setIsOpen(false)
               return router.push(`/editor/template/${res.result.id}`)
            }
          }
          setIsOpen(false)
        } catch (error) {
          console.log(error);
          
          update ? toast('⛔ Oops!', { description: 'Could not update your template' }) 
            : toast('⛔ Oops!', { description: 'Could not create your template' });
          setIsOpen(false)
        }
      };

  return (
    <div className="text-sm font-medium text-muted-foreground"> 
       {update ?
       
       <Button size={'icon'} variant={'outline'} onClick={() =>  setIsOpen(true)}>
          <Pencil className='h-[1rem] w-[1rem]' />
        </Button>
       
       : <Button 
          variant="outline" 
          size="sm" 
          onClick={() =>  setIsOpen(true)}
          >
            <LayoutTemplate className="pr-2 h-6 w-6"/> 
            Create new template 
        </Button>}
        <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
      >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">{update ? `Edit Email Template` : `New Email Template!`}</DialogTitle>
            <DialogDescription className="text-center pt-2">
              {!update && `Create new email template`}
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Template name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="previewImage"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Preview Image URL</FormLabel>
                      <FormControl>
                      <ImageUploadComponent 
                        onChange={field.onChange}
                        value={field.value}
                        />
                        {/* <Input placeholder="URL of the preview image" {...field} /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center pt-6 pb-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loading /> : 'Save Template'}
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
