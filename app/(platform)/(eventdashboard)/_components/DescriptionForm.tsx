import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormSchema } from '@/lib/types';
import { z } from 'zod';
  
  type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
  }
  
  export const DescriptionForm = ({form}: Props) => {
  
    const isLoading = form.formState.isSubmitting
  
    return (
      <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
        Share A Little About Your Event
      </h2>

  
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
        <div className="mb-1">
           <FormField
                disabled={isLoading}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Tell us a little about your event"
                        className="resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </div>
      </div>
    </div>
    )
  }
  