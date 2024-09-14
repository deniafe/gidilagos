// OrganizationForm.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface OrganizationFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

export const OrganizationForm = ({ form }: OrganizationFormProps) => {
  return (
    <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} space-y-4 mb-8`}>
        <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
         Enter Event {`Organizer's`} Details (Optional)
        </h2>
      <FormField
        control={form.control}
        name="organizationName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter organization name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="organizationEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter organization email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="organizationPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone number" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="organizationDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter organization description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="organizationWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input placeholder="Enter website URL" type="url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
