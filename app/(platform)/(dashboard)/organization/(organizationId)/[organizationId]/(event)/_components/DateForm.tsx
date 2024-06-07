import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form';
import {SelectDate} from './SelectDate';
import { SelectTime } from './SelectTime';
import { FormSchema } from '@/lib/types';
import { z } from 'zod';
  
  type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
  }
  
  export const DateForm = ({form}: Props) => {
  
    const isLoading = form.formState.isSubmitting
  
    return (
      <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
         Enter Event Date And Time
      </h2>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
        <div className="md:col-span-1" >
            <FormField
                disabled={isLoading}
                control={form.control} 
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date</FormLabel>
                    <FormControl>
                      <SelectDate 
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </div>

        <div className="md:col-span-1" >
            <FormField
                disabled={isLoading}
                control={form.control}
                name="time"
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Event Time</FormLabel>
                    <FormControl>
                      <SelectTime 
                        value={field.value}
                        onSelect={field.onChange}
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
  