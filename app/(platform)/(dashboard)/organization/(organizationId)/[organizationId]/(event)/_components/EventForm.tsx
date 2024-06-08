'use client'
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form
} from '@/components/ui/form'
import { toast } from "sonner"
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Loading } from "@/components/global/Loading";
import { useOrganization } from "@/providers/organization-provider";
import Steps from "./Steps";
import { Event, EventAddress, EventLinks, FormSchema, LGA, Period } from "@/lib/types";
import { useForm } from "react-hook-form";
import { BasicForm } from "./BasicForm";
import { DescriptionForm } from "./DescriptionForm";
import { DateForm } from "./DateForm";
import { AddressForm } from "./AddressForm";
import { SocialLinkForm } from "./SocialLinkForm";
import { createSlug, formatDate } from "@/lib/utils";
import { createEvent, updateEvent } from "@/actions/event.actions";
import { useRouter } from "next/navigation";

type Props = {
  data?: Partial<Event>
  orgId: string
}

enum STEPS {
  BASICS = 0,
  DESCRIPTION = 1,
  DATE = 2,
  ADDRESS = 3,
  LINKS = 4,
}

export function EventForm({ orgId, data }: Props) {

  const { setCurrentOrganizationId } = useOrganization();
  setCurrentOrganizationId(orgId)
  const route = useRouter()

  const [step, setStep] = useState(STEPS.BASICS);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState<LGA[]>([])
  const [regionNames, setRegionNames] = useState<string[]>([]) 
  const [center, setCenter] = useState<[number, number]>([6.5244, 3.3792])
  const [zoom, setZoom] = useState<number>(8)

  useEffect(() => {
    data?.venue?.center && setCenter(data?.venue?.center)
    data?.venue?.zoom && setZoom(data?.venue?.zoom)
  }, [data])
  

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      category: data?.category,
      price: data?.price || '0',
      banner: data?.banner,
      description: data?.description,
      date: {
        from: data?.date?.from ? new Date(formatDate(data.date.from)) : new Date(),
        to: data?.date?.to ? new Date(formatDate(data.date.to)) : new Date(),
      },
      time: data?.time || {hours: 12, minutes: 0, period: Period.AM},
      state: data?.venue?.state,
      region: data?.venue?.region,
      street: data?.venue?.street,
      website: data?.links?.website,
      linkedin: data?.links?.linkedin,
      instagram: data?.links?.instagram,
      twitter: data?.links?.twitter,
    },
  })

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const secondaryAction = step === STEPS.BASICS ? undefined : onBack

  const actionLabel = useMemo(() => {
    if (step === STEPS.LINKS) {
      return 'Create New Event'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASICS) {
      return undefined
    }

    return 'Back'
  }, [step]);

  const changeTab = () => {
    if (step !== STEPS.LINKS) {
      return onNext();
    }
  }

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      if (!orgId) return

      setLoading(true)

      const addr: EventAddress = {
        center,
        zoom,
        state: values.state,
        region: values.region,
        street: values.street
      }

      const links: EventLinks = {
        website: values.website,
        twitter: values.twitter,
        instagram: values.instagram,
        linkedin: values.linkedin
      }

      const slug = createSlug(values.name)

      const eventData: Partial<Event> = {
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: orgId,
        name: values.name,
        category: values.category,
        banner: values.banner,
        price: values.price,
        isFree: !parseInt(values.price),
        isApproved: false,
        date: values.date,
        time: values.time,
        description: values.description,
        venue: addr,
        links,
        slug
      }

      if(data?.id) {
        await updateEvent(data.id, eventData)
        toast('✅ Event updates successfully')
      } else {
        await createEvent(eventData)
        toast('✅ Event created successfully')
      }

      route.push(`/organization/${orgId}`)
      setLoading(false)

      console.log('Handle submit has been clicked', values)

    } catch (error) {
      setLoading(false)
      toast('⛔ Oppse!', {description: 'could not create or update your event'})
    }
  }

  let bodyContent = (
    <BasicForm form={form} />
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <DateForm form={form} />
    );
  }

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <AddressForm 
        form={form}
        setRegions={setRegions} 
        setRegionNames={setRegionNames}
        setCenter={setCenter}
        setZoom={setZoom}
        regions={regions}
        regionNames={regionNames}
        center={center}
        zoom={zoom}
      />
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <DescriptionForm form={form} />
    );
  }

  if (step === STEPS.LINKS) {
    bodyContent = (
      <SocialLinkForm form={form} />
    );
  }

  return (
    <section
      className="pt-1 mb-12 md:mb-16 w-full"
    >
      <div className="mt-8 md:mt-2 px-[2rem]">

        <div className="md:px-[4rem]  md:mb-0" >
          <h1 id="share" className="text-center text-[1.75rem] text-black dark:text-white font-medium mb-4 md:mb-12">
            Share Your Event On Gidiopolis
          </h1>

          <div className="mt-4 md:px-6">

            <Steps currentStep={step + 1}/>

            <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
                {bodyContent}
              
              {/* Navigation buttons */}
              <div className="flex justify-end space-x-4 mt-[4rem]">
                {secondaryAction && secondaryActionLabel && (
                    <Button type="button" onClick={secondaryAction}>
                      <span className="px-4">{secondaryActionLabel}</span>
                    </Button> 
                )}
                {step !== STEPS.LINKS && (
                  <Button type="button" onClick={changeTab}>
                    <span className="px-4">Next</span>
                  </Button>
                )}
                {step === STEPS.LINKS && (
                  <Button disabled={loading} type="submit">
                    {
                      loading ?
                      (<Loading />) :
                      (
                        <span className="px-4">{data ? 'Update Event' : 'Create New Event'}</span>
                      )
                    }
                  </Button>
                )}
              </div>
             </form>
          </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
