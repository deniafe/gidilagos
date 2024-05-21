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
import { Event } from "@/lib/types";
import { useForm } from "react-hook-form";
import { BasicForm } from "./BasicForm";

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

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Event Name cannot be less than 3 characters.' }),
  category: z.string().min(4, { message: 'Organization email must be atleast 4 chars.' }),
  price: z.string().min(10, { message: 'Phone number must be atleast 10 chars.' }),
  banner: z.string().min(1, { message: 'Organization logo required.' }),
  // website: z.string(),
  // description: z.string(),
})

export function EventForm({ orgId, data }: Props) {

  const { setCurrentOrganizationId } = useOrganization();
  setCurrentOrganizationId(orgId)

  const [step, setStep] = useState(STEPS.BASICS);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      category: data?.category,
      price: data?.price,
      banner: data?.banner,
      // website: data?.website,
      // description: data?.description
    },
  })

  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    setMounted(true);
  }, []);

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


  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {

    try {
      if (!orgId) return

      const orgData = {
        organizationId: orgId,
        name: values.name,
        category: values.category,
        banner: values.banner,
        price: values.price,
        // website: values.website,
        // description: values.description
      }

    } catch (error) {
      console.log(error)
      toast('⛔ Oppse!', {description: 'could not create or update your organization'})
    }
  }


  let bodyContent = (
    <BasicForm form={form} />
  )

  // if (step === STEPS.DATE) {
  //   bodyContent = (
  //     <DateForm 
  //       setEventDate={setEventDate} 
  //       eventDate={eventDate} 
  //       setEventTime={setEventTime} 
  //       eventTime={eventTime}
  //       />
  //   );
  // }

  // if (step === STEPS.ADDRESS) {
  //   bodyContent = (
  //     <AddressForm 
  //       setEventState={setEventState} 
  //       setEventRegion={setEventRegion} 
  //       setEventAddress={setEventAddress} 
  //       setRegions={setRegions} 
  //       setRegionNames={setRegionNames}
  //       setCenter={setCenter}
  //       setZoom={setZoom}
  //       regions={regions}
  //       regionNames={regionNames}
  //       eventState={eventState}
  //       eventRegion={eventRegion}
  //       eventAddress={eventAddress}
  //       center={center}
  //       zoom={zoom}
  //     />
  //   );
  // }

  // if (step === STEPS.DESCRIPTION) {
  //   bodyContent = (
  //     <DescriptionForm setEventDescription={setEventDescription} eventDescription={eventDescription} />
  //   );
  // }

  // if (step === STEPS.LINKS) {
  //   bodyContent = (
  //     <SocialLinkForm 
  //       setTwitter={setTwitter} 
  //       setInstagram={setInstagram} 
  //       setLinkedIn={setLinkedIn}
  //       twitter={twitter}
  //       instagram={instagram}
  //       linkedIn={linkedIn}   
  //       />
  //   );
  // }

  return (
    <section
      className="pt-1 mb-12 md:mb-16 w-full"
    >
      <div className="mt-8 md:mt-2 px-[2rem]">

        <div className="md:px-[4rem]  md:mb-0" >
          <h1 id="share" className="text-center text-[1.75rem] text-black font-medium mb-4 md:mb-12">
            Share Your Event On Gidiopolis
          </h1>

          <div className="mt-4 md:px-6">

            <Steps currentStep={step + 1}/>

            <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >

            {/* <form 
             data-te-validation-init
             data-te-active-validation="true"
             className="md:mx-[4rem] md:mb-8"
            > */}

                {bodyContent}
              
              {/* Submit button */}
              <div className="flex justify-end space-x-4 mt-[4rem]">
                {secondaryAction && secondaryActionLabel && (
                    <Button onClick={secondaryAction}>
                      <span className="px-4">{secondaryActionLabel}</span>
                    </Button> 
                )}

                <Button>
                    {
                      loading ?
                      (<Loading />) :
                      (
                        <span className="px-4">{actionLabel}</span>
                      )
                    }
                </Button> 
              </div>
              

              {/* <div
                className="my-8 inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleFormSubmit}
              >

                {
                  loading ?
                  (<Loading />) :
                  (
                    <span>
                      Create New Event
                    </span>
                  )
                }
              </div> */}
             
             </form>
          </Form>
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}
