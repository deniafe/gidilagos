'use client'
import { useEffect, useState } from "react";
import { EventForm } from "../../../_components/EventForm"
import { getEventById } from "@/Firebase/queries";
import { toast } from "sonner";
import { Event } from '@/lib/types';
import { useRouter } from "next/navigation";

type Props = { eventId: string }

export const EditEvent = ({eventId}: Props) => {
    const [event, setEvent] = useState<Event>({} as Event);
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        const init = async () => {
          const result = await getEventById(eventId);
    
          if (result.error) {
            console.log('There is an error')
            setLoading(false)
            toast('⛔ Oppse!', {description: 'could get event'})
            return router.push(`/`)
          }
    
          const data = result?.event
          data && setEvent(data)
          return setLoading(false)
        };
        init();
      }, [eventId]);
  return (
    <>
        {event?.id && <EventForm data={event}/>}
    </>
  )
}
