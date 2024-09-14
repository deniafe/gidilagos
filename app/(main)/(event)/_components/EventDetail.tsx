'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Map from '@/app/(platform)/(dashboard)/organization/(organizationId)/[organizationId]/(event)/_components/Map';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import SimilarEvent from './SimilarEvent';
import { Event } from '@/lib/types';
import { toast } from "sonner";
import { getCategoryEvents, getEventById } from "@/Firebase/queries";
import { OrganizerIcon } from "@/components/icons/EventDetails";
// import Map from './Map';
// import { DateRange } from 'react-date-range';

type Props = {
    eventId: string
  };

export const EventDetail = ({eventId}: Props) => {

  const [event, setEvent] = useState<Event>({} as Event);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  const getSimilarEvents = async (initial = false, category: string) => {
    setLoading(true);
    const catEvents = await getCategoryEvents(category, 4);
    if (catEvents.error) {
      setLoading(false);
      return toast('⛔ Oops!', { description: 'Could not get events' });
    }

    const similarEvents: Event[] = catEvents.events;
    setEvents(similarEvents);
    setLoading(false);
  };

useEffect(() => {
  const init = async () => {

    const result = await getEventById(eventId);

    if (result.error) {
      toast('There is an error getting the event')
      return router.push("/")
    }

    const data = result?.event
    data && setEvent(data)
    data && getSimilarEvents(true, data.category)
  };

  init()
}, [eventId])

  
  return (
    <section className="mb-32 pt-1">
     <div className="px-[1rem] md:px-0 mt-24 md:mt-0 mb-8">
        <Image
          height={200}
          width={1000}
          alt='Event Banner'
          src={event.banner}
          className="rounded-[2rem] lg:rounded-full w-full h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
          style={{
            background: 'lightgray 50% / cover no-repeat'
          }}
        ></Image>
      </div>

      <h2 className="mb-8 text-[1.75rem] font-medium px-[1rem] md:px-[2rem]">
       {event?.name}
      </h2>

      <div className=" mb-12 grid-1 grid gap-8 md:grid-cols-3 px-[2rem]">
        {/* Tailwind Elements section */}
        {/* Products section */}
        <div>
          <h6 className="mb-2 md:mb-8 font-semibold uppercase">
            When
          </h6>
          <div className='mb-4 flex font-medium text-sm'>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_199_2181)">
              <path d="M20.5498 4.20013H18.5998V5.40011H20.3998V18.5999H3.60004V5.40011H5.40001V4.20013H3.45004C3.30978 4.20247 3.17136 4.23242 3.04269 4.28827C2.91401 4.34412 2.79759 4.42477 2.70009 4.52562C2.60258 4.62646 2.5259 4.74553 2.47442 4.87602C2.42294 5.0065 2.39767 5.14585 2.40006 5.28611V18.7139C2.39767 18.8541 2.42294 18.9935 2.47442 19.124C2.5259 19.2545 2.60258 19.3735 2.70009 19.4744C2.79759 19.5752 2.91401 19.6559 3.04269 19.7117C3.17136 19.7676 3.30978 19.7975 3.45004 19.7999H20.5498C20.69 19.7975 20.8284 19.7676 20.9571 19.7117C21.0858 19.6559 21.2022 19.5752 21.2997 19.4744C21.3972 19.3735 21.4739 19.2545 21.5254 19.124C21.5769 18.9935 21.6021 18.8541 21.5997 18.7139V5.28611C21.6021 5.14585 21.5769 5.0065 21.5254 4.87602C21.4739 4.74553 21.3972 4.62646 21.2997 4.52562C21.2022 4.42477 21.0858 4.34412 20.9571 4.28827C20.8284 4.23242 20.69 4.20247 20.5498 4.20013Z" fill="currentColor"/>
              <path d="M6 9.00005H7.19998V10.2H6V9.00005Z" fill="currentColor"/>
              <path d="M9.6001 9.00005H10.8001V10.2H9.6001V9.00005Z" fill="currentColor"/>
              <path d="M13.1997 9.00005H14.3997V10.2H13.1997V9.00005Z" fill="currentColor"/>
              <path d="M16.7998 9.00005H17.9998V10.2H16.7998V9.00005Z" fill="currentColor"/>
              <path d="M6 12H7.19998V13.2H6V12Z" fill="currentColor"/>
              <path d="M9.6001 12H10.8001V13.2H9.6001V12Z" fill="currentColor"/>
              <path d="M13.1997 12H14.3997V13.2H13.1997V12Z" fill="currentColor"/>
              <path d="M17.3335 12.6667H18.6668V14H17.3335V12.6667Z" fill="currentColor"/>
              <path d="M5.3335 16H6.66683V17.3333H5.3335V16Z" fill="currentColor"/>
              <path d="M9.3335 16H10.6668V17.3333H9.3335V16Z" fill="currentColor"/>
              <path d="M13.3335 16H14.6668V17.3333H13.3335V16Z" fill="currentColor"/>
              <path d="M17.3335 16H18.6668V17.3333H17.3335V16Z" fill="currentColor"/>
              <path d="M6.66667 6.66667C6.84348 6.66667 7.01305 6.59643 7.13807 6.47141C7.2631 6.34638 7.33333 6.17681 7.33333 6V2C7.33333 1.82319 7.2631 1.65362 7.13807 1.5286C7.01305 1.40357 6.84348 1.33334 6.66667 1.33334C6.48986 1.33334 6.32029 1.40357 6.19526 1.5286C6.07024 1.65362 6 1.82319 6 2V6C6 6.17681 6.07024 6.34638 6.19526 6.47141C6.32029 6.59643 6.48986 6.66667 6.66667 6.66667Z" fill="currentColor"/>
              <path d="M17.3332 6.66667C17.51 6.66667 17.6796 6.59643 17.8046 6.47141C17.9296 6.34638 17.9998 6.17681 17.9998 6V2C17.9998 1.82319 17.9296 1.65362 17.8046 1.5286C17.6796 1.40357 17.51 1.33334 17.3332 1.33334C17.1564 1.33334 16.9868 1.40357 16.8618 1.5286C16.7367 1.65362 16.6665 1.82319 16.6665 2V6C16.6665 6.17681 16.7367 6.34638 16.8618 6.47141C16.9868 6.59643 17.1564 6.66667 17.3332 6.66667Z" fill="currentColor"/>
              <path d="M8.6665 4H15.3332V5.33333H8.6665V4Z" fill="currentColor"/>
              </g>
              <defs>
              <clipPath id="clip0_199_2181">
              <rect width="24" height="24" fill="currentColor"/>
              </clipPath>
              </defs>
            </svg>

            <p className='ml-2' >{event?.date?.from && formatDate(event.date.from)} to {event?.date?.to && formatDate(event.date.to)}</p>
          </div>

          <div className='flex font-medium text-sm'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.57811 17.8994C8.94451 18.1025 9.07692 18.5641 8.87385 18.9305L7.61105 21.209C7.40798 21.5754 6.94633 21.7079 6.57993 21.5048C6.21352 21.3017 6.08111 20.8401 6.28418 20.4737L7.54699 18.1951C7.75006 17.8287 8.2117 17.6963 8.57811 17.8994Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4217 17.8994C15.7881 17.6963 16.2498 17.8287 16.4528 18.1951L17.7156 20.4737C17.9187 20.8401 17.7863 21.3017 17.4199 21.5048C17.0535 21.7079 16.5919 21.5754 16.3888 21.209L15.126 18.9305C14.9229 18.5641 15.0553 18.1025 15.4217 17.8994Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.18003C8.23347 5.18003 5.18011 8.2334 5.18011 11.9999C5.18011 15.7664 8.23347 18.8198 12 18.8198C15.7665 18.8198 18.8199 15.7664 18.8199 11.9999C18.8199 8.2334 15.7665 5.18003 12 5.18003ZM3.66309 11.9999C3.66309 7.39557 7.39564 3.66301 12 3.66301C16.6043 3.66301 20.3369 7.39557 20.3369 11.9999C20.3369 16.6043 16.6043 20.3368 12 20.3368C7.39564 20.3368 3.66309 16.6043 3.66309 11.9999Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.01597 4.11157C7.47176 3.90657 6.88006 3.86246 6.31147 3.98453C5.74288 4.10659 5.22142 4.38967 4.8093 4.79997C4.39719 5.21028 4.11182 5.7305 3.98726 6.29854C3.8627 6.86659 3.9042 7.45848 4.10681 8.00359C4.30943 8.54869 4.66459 9.02399 5.12993 9.37278C5.46514 9.62402 5.53321 10.0994 5.28196 10.4346C5.03072 10.7699 4.5553 10.8379 4.22009 10.5867C3.52182 10.0633 2.98887 9.35009 2.68484 8.53212C2.38081 7.71416 2.31854 6.826 2.50545 5.97361C2.69236 5.12123 3.12056 4.34062 3.73896 3.72492C4.35737 3.10923 5.13985 2.68446 5.99305 2.5013C6.84625 2.31814 7.73413 2.38432 8.55075 2.69194C9.36737 2.99956 10.0782 3.53564 10.5985 4.2362C10.8483 4.57251 10.7781 5.04762 10.4418 5.29739C10.1055 5.54716 9.63042 5.47701 9.38065 5.1407C9.03392 4.67383 8.56018 4.31658 8.01597 4.11157Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 2.39999C12.4187 2.4 12.7583 2.73961 12.7583 3.15852L12.7582 4.42158C12.7582 4.8405 12.4186 5.18008 11.9997 5.18007C11.5808 5.18006 11.2412 4.84046 11.2412 4.42155L11.2412 3.15849C11.2413 2.73957 11.5809 2.39998 11.9998 2.39999Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 7.45224C12.4186 7.45224 12.7582 7.79184 12.7582 8.21075V11.9999C12.7582 12.4188 12.4186 12.7584 11.9997 12.7584C11.5808 12.7584 11.2412 12.4188 11.2412 11.9999V8.21075C11.2412 7.79184 11.5808 7.45224 11.9997 7.45224Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4634 11.4636C11.7596 11.1674 12.2399 11.1674 12.5361 11.4636L15.2154 14.1429C15.5116 14.4391 15.5116 14.9194 15.2154 15.2156C14.9192 15.5118 14.4389 15.5118 14.1427 15.2156L11.4634 12.5363C11.1672 12.2401 11.1672 11.7598 11.4634 11.4636Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4489 2.69194C16.2655 2.38432 17.1534 2.31814 18.0066 2.5013C18.8598 2.68446 19.6422 3.10923 20.2606 3.72492C20.8791 4.34061 21.3073 5.12123 21.4942 5.97361C21.6811 6.826 21.6188 7.71416 21.3148 8.53212C21.0107 9.35009 20.4778 10.0633 19.7795 10.5867C19.4443 10.8379 18.9689 10.7699 18.7177 10.4346C18.4664 10.0994 18.5345 9.62402 18.8697 9.37278C19.335 9.02399 19.6902 8.54869 19.8928 8.00359C20.0954 7.45848 20.1369 6.86659 20.0124 6.29854C19.8878 5.7305 19.6024 5.21028 19.1903 4.79997C18.7782 4.38967 18.2567 4.10659 17.6881 3.98453C17.1196 3.86246 16.5279 3.90657 15.9836 4.11157C15.4394 4.31658 14.9657 4.67383 14.619 5.1407C14.3692 5.47701 13.8941 5.54716 13.5578 5.29739C13.2215 5.04762 13.1513 4.57251 13.4011 4.2362C13.9214 3.53564 14.6322 2.99956 15.4489 2.69194Z" fill="currentColor"/>
            </svg>
            <p className='ml-2' >
                {event?.time?.hours} : {event?.time?.minutes < 10 ? `0${event?.time?.minutes}` : event?.time?.minutes} {event?.time?.period}
            </p>
          </div>

        </div>

      </div>

      {/* Address Section */}
      <div className='mb-12 px-[2rem]'>
        <h6 className="mb-2 md:mb-8 font-semibold uppercase">
          Where
        </h6>
        <div className='flex font-medium text-sm'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9999 2.4C10.0001 2.40236 8.08295 3.19781 6.6689 4.61186C5.25485 6.02591 4.4594 7.94309 4.45704 9.94286C4.45464 11.5771 4.98845 13.1669 5.97658 14.4686C5.97658 14.4686 6.1823 14.7394 6.2159 14.7785L11.9999 21.6L17.7866 14.7751C17.8168 14.7387 18.0232 14.4686 18.0232 14.4686L18.0239 14.4665C19.0115 13.1655 19.5451 11.5763 19.5428 9.94286C19.5404 7.94309 18.7449 6.02591 17.3309 4.61186C15.9168 3.19781 13.9997 2.40236 11.9999 2.4ZM11.9999 12.6857C11.4574 12.6857 10.9271 12.5248 10.476 12.2235C10.025 11.9221 9.67343 11.4937 9.46583 10.9925C9.25823 10.4913 9.20391 9.93982 9.30974 9.40775C9.41558 8.87569 9.67681 8.38696 10.0604 8.00337C10.444 7.61977 10.9327 7.35854 11.4648 7.2527C11.9969 7.14687 12.5484 7.20119 13.0495 7.40879C13.5507 7.61639 13.9791 7.96795 14.2805 8.41901C14.5819 8.87007 14.7428 9.40037 14.7428 9.94286C14.7418 10.67 14.4526 11.3672 13.9384 11.8813C13.4242 12.3955 12.7271 12.6848 11.9999 12.6857Z" fill="currentColor"/>
        </svg>
        <p className='ml-2' >
          {event?.venue?.street}, {event?.venue?.region}, {event?.venue?.state}
          </p>
        </div>
        <div className='lg:w-2/3 mt-[1rem]'>
          <Map center={event?.venue?.center} zoom={event?.venue?.zoom} />
        </div>
        
      </div>

      <div className='mb-12 px-[2rem]'>
        <h3 className="mb-2 font-semibold uppercase">
          About Event
        </h3>
        <p 
        className="mb-6 w-10 rounded text-center text-white text-xs dark:text-neutral-200"
        style={{background: event?.price === 'free' ? '#31859C' : '#77933C'}}
        >
          {event.isFree ? "Free" : "Paid"}
        </p>
        <div className="w-full md:w-8/12 " >
          {event?.description}
        </div>
      </div>

      <div className='mb-12 px-[2rem]'>
        <h3 className="mb-2 font-semibold uppercase">
          About Organizer
        </h3>
        <div className="mb-6 md:w-8/12" >
          {event?.organization?.description}
        </div>
        <h6 className="mb-2 text-xs font-semibold uppercase">
          Contact Organizer
        </h6>
        <p className="mb-2" >
          {event?.organization?.phone}, {event?.organization?.email}
        </p>
        <div className='mb-12 flex md:w-1/4' >
          <OrganizerIcon />
        </div>
      </div>

      <SimilarEvent title={'Similar Event'} events={events}/>
      
    </section>
  )
}