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
import FileUpload from '@/components/global/file-upload'
import { catexts } from '@/lib/constants';
import { UseFormReturn } from 'react-hook-form';
import MediaUploadButton from '@/components/media/UploadMediaButton';

type Props = {
  form: UseFormReturn<{
    name: string;
    category: string;
    price: string;
    banner: string;
}, any, undefined>
}

export const BasicForm = ({form}: Props) => {

  const isLoading = form.formState.isSubmitting

  return (
    <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
    <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
      Enter Basic Details About Event
    </h2>

    <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
      {/* Event Name input */}
      <div className="mb-1">
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
    </div>

    <div className="grid grid-cols-1 gap-4 gap-y-12 mb-[2rem] md:grid-cols-2 md:mb-[2rem]">
      {/* Event Category input */}
      <div className="mb-1">
        {/* <SelectInput 
          label='Event Category' 
          value={eventCategory}
          items={catexts} 
          handleChange={(value) => setEventCategory(value)} 
        /> */}
        <FormField
          disabled={isLoading}
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Category</FormLabel>
              <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    catexts.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)
                  }
                </SelectContent>
              </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
      </div>

      {/* Event Price input */}
      <div className="mb-1">
         <FormField
          disabled={isLoading}
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Event Price (₦)</FormLabel>
              <FormControl>
                {/* <Input
                  placeholder="0"
                  {...field}
                /> */}
                <NumberInput
                  defaultValue={0}
                  // onValueChange={async (val) => {
                  //   if (!data?.id) return
                  //   await updateAgencyDetails(data.id, { goal: val })
                  //   await saveActivityLogsNotification({
                  //     agencyId: data.id,
                  //     description: `Updated the agency goal to | ${val} Sub Account`,
                  //     subaccountId: undefined,
                  //   })
                  //   router.refresh()
                  // }}
                  min={1}
                  className="bg-background rounded-full px-4 !border !border-input"
                  placeholder="Price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
         
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
      {/* Event Upload Banner */}
      <div className="mb-1">
         <FormField
              disabled={isLoading}
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Banner</FormLabel>
                  <FormControl>
                    {/* <FileUpload
                      apiEndpoint="agencyLogo"
                      onChange={field.onChange}
                      value={field.value}
                    /> */}
                    <MediaUploadButton />
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
