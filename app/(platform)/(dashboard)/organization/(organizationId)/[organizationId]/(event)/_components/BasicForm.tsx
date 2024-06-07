import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NumberInput } from '@tremor/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { catexts } from '@/lib/constants';
import { UseFormReturn } from 'react-hook-form';
import { ImageUploadComponent } from '@/components/global/media/ImageUploadComponent';
import { FormSchema, Period } from '@/lib/types';
import { z } from 'zod';

type Props = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

export const BasicForm = ({form}: Props) => {

  const isLoading = form.formState.isSubmitting

  return (
    <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
    <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
      Enter Basic Details About Event
    </h2>

    <div className="grid grid-cols-1 gap-y-4 md:gap-4 md:grid-cols-2">

    <div className="mb-1 md:col-span-2">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
      </div>

      <div className="mb-1">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Category</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Category"  />
                </SelectTrigger>
                <SelectContent>
                  {
                    catexts.map((cat) => 
                    <SelectItem 
                    key={cat} 
                    value={cat}
                    >
                      {cat}
                    </SelectItem>)
                  }
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
      </div>

      <div className="mb-1">
         <FormField
          disabled={isLoading}
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Price (₦)</FormLabel>
              <FormControl>
                <NumberInput
                  defaultValue={field.value}
                  min={1}
                  className="bg-background rounded-full px-4 !border !border-input"
                  placeholder="Price"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
         
      </div>
    </div>

    <div className="mt-[2rem] md:mb-2">
      <div className="mb-1">
         <FormField
              disabled={isLoading}
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Banner</FormLabel>
                  <FormControl>
                    <ImageUploadComponent 
                      onChange={field.onChange}
                      value={field.value}
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
