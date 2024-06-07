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

type Props = {
  setJson: Dispatch<SetStateAction<string>>
};

const FormSchema = z.object({
  json: z.string().min(2, { message: 'JSON name must be at least 2 characters.' }),
});

export const LoadJSONButton = ({ setJson }: Props) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(FormSchema),
    });
   
    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        setJson(values.json)
        setIsOpen(false)
    };

  return (
    <div className="text-sm font-medium text-muted-foreground"> 
        <Button size="sm" variant="outline"  onClick={() =>  setIsOpen(true)}>
           <FileJson className='h-4 w-4 mr-2' />
            Load JSON
        </Button>
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => !isOpen &&  setIsOpen(false)}
        >
        <DialogContent className="sm:w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">New Email Template!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Create new email template
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="json"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Template Json</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Json" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <div className="flex justify-center pt-6 pb-4">
                  <Button type="submit">
                     Load Template
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
