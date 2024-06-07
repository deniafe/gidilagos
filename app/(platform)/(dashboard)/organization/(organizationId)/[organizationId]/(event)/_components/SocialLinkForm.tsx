import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'
  import { UseFormReturn } from 'react-hook-form';
  import { FormSchema, Period } from '@/lib/types';
  import { z } from 'zod';
  
  type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
  }
  
  export const SocialLinkForm = ({form}: Props) => {
  
    const isLoading = form.formState.isSubmitting
  
    return (
      <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
        Enter Event Website And Other Social Links
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-[2rem] md:grid-cols-2 md:mb-[2rem]">
        <div className="mb-1">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Event Website Url</FormLabel>
                <FormControl>
                <Input
                    placeholder="Website"
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
            name="twitter"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Event Twitter Url</FormLabel>
                <FormControl>
                <Input
                    placeholder="Twitter"
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
            name="linkedin"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Event LinkedIn Url</FormLabel>
                <FormControl>
                <Input
                    placeholder="LinkedIn"
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
            name="instagram"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Event Instagram Url</FormLabel>
                <FormControl>
                <Input
                    placeholder="Instagram"
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
  