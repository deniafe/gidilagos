'use client'

import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { useRouter } from 'next/navigation' 

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { toast } from "sonner"
import * as z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loading } from '../global/Loading'
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadComponent } from '@/components/global/media/ImageUploadComponent';
import { createOrganization, deleteOrganization, updateOrganization } from '@/actions/organization.actions'
import { Organization } from '@/lib/types'

type Props = {
  data?: Partial<Organization>
  title?: string
  subtitle?: string
  description?: string
}

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Organization name must be atleast 2 chars.' }),
  organizationEmail: z.string().min(4, { message: 'Organization email must be atleast 4 chars.' }),
  organizationPhone: z.string().min(10, { message: 'Phone number must be atleast 10 chars.' }),
  address: z.string().min(6, { message: 'Address name must be atleast 6 chars.' }),
  city: z.string().min(2, { message: 'City name must be atleast 2 chars.' }),
  zipCode: z.string().min(4, { message: 'Zipcode name must be atleast 4 chars.' }),
  state: z.string().min(2, { message: 'State name must be atleast 2 chars.' }),
  logo: z.string().min(1, { message: 'Organization logo required.' }),
  website: z.string().url(),
  description: z.string().min(20, { message: 'Organozation description must be atleast 20 chars.' }),
})

export const OrganizationDetails = (
  { data, title, subtitle, description }: Props
) => {
  const router = useRouter()
  const {user} = useUser()
  const [deletingAgency, setDeletingAgency] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      organizationEmail: data?.organizationEmail,
      organizationPhone: data?.organizationPhone,
      address: data?.address,
      city: data?.city,
      zipCode: data?.zipCode,
      state: data?.state,
      logo: data?.logo,
      website: data?.website,
      description: data?.description
    },
  })
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log('Submitting form 1 -----------------------------', user)
    try {
      if (!user?.id) return

      const orgData = { 
        userId: user.id,
        address: values.address,
        logo: values.logo,
        city: values.city,
        organizationPhone: values.organizationPhone,
        name: values.name,
        state: values.state,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationEmail: values.organizationEmail,
        website: values.website,
        description: values.description
      }

      if(data?.id) {
        const result = await updateOrganization(data.id, orgData)

        // if (result) {
          return toast('✅ Organization Updated')
        // }
      } else {
        const result = await createOrganization(orgData)

        if (result) {
          toast('✅ Organization Created') 
          return router.push('/organization')
        }
      } 

    } catch (error) {
      console.log(error)
      toast('⛔ Oppse!', {description: 'could not create or update your organization'})
    }
  }
  const handleDeleteAgency = async () => {
    if (!data?.id) return
    setDeletingAgency(true)
    //WIP: discontinue the subscription
    try {
      const response = await deleteOrganization(data.id)
      toast('✅ Deleted Organization',{
        description: 'Organization deleted successfully',
      })
      setDeletingAgency(false)
      router.push('/organization')
    } catch (error) {
      console.log(error)
      toast('⛔ Oppse!', {
        description: 'could not delete your organization ',
      })
    }
    setDeletingAgency(false)
  }

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          {/* <CardTitle>{title}</CardTitle> */}
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
               <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Logo</FormLabel>
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
              {/* <FormField
                disabled={isLoading}
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint="agencyLogo"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Organization name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                 disabled={isLoading}
                  control={form.control}
                  name="organizationEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Organization Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
              <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="organizationPhone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Organization Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <FormField
                disabled={isLoading}
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="http://..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

             <FormField
                disabled={isLoading}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Description</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Tell us a little bit about your organization"
                        className="resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 st..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Zipcode"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center pt-6 pb-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : 'Save Organization Information'}
                </Button>
              </div>
            </form>
          </Form>

          {data?.id && (
            <div className="flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4">
              <div>
                <div>Danger Zone</div>
              </div>
              <div className="text-muted-foreground">
                Deleting your Organization cannot be undone. This will also delete all
                Events created under this organization.
              </div>
              <AlertDialogTrigger
                disabled={isLoading || deletingAgency}
                className="text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-red-800 whitespace-nowrap"
              >
                {deletingAgency ? 'Deleting...' : 'Delete Organization'}
              </AlertDialogTrigger>
            </div>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                This action cannot be undone. This will permanently delete the
                Organization account and all Events under it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deletingAgency}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteAgency}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}