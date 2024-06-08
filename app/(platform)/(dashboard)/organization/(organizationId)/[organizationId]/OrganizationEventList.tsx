'use client'
import { Button } from "@/components/ui/button"
import { useOrganization } from "@/providers/organization-provider"
import { useEffect, useState } from "react";
import { Event } from '@/lib/types';
import {OrganizationEventCard} from "./(event)/_components/OrganizationEventCard";
import { getOrganizationEvents } from "@/Firebase/queries";
import { toast } from "sonner";
import Link from "next/link";
import { SkeletonCard } from "@/app/(main)/_components/SkeletonCard";
import { QueryDocumentSnapshot } from "firebase/firestore";

type Props = {
  orgId: string
};

export const OrganizationEventList = ({orgId}: Props) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const {setCurrentOrganizationId} = useOrganization()

  const getEvents = async (initial = false) => {
    setLoading(true);
    const orgEvents = await getOrganizationEvents(orgId, 8, initial ? null : lastVisible);
    if (orgEvents.error) {
      setLoading(false);
      return toast('⛔ Oops!', { description: 'Could not get organization events' });
    }

    const newEvents: Event[] = orgEvents.events;
    setEvents((prevEvents) => initial ? newEvents : [...prevEvents, ...newEvents]);
    setLastVisible(orgEvents.lastVisible);
    setHasMore(newEvents.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentOrganizationId(orgId)
  }, [orgId])

  useEffect(() => {
    getEvents(true);
  }, []);

  const handleShowMore = () => {
    if (hasMore) {
      getEvents();
    }
  };

  const delEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
  }


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>

      {!!events.length && <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-12 px-[2rem]">
        {events.map((event) => (
          <div className="flex justify-center md:justify-start mb-4" key={event.id}>
            <OrganizationEventCard event={event} delEvent={delEvent} />
          </div>
        ))}
      </div>}

     { !events.length && !loading && <div
        className="flex flex-1 items-center justify-center rounded-lg shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No Events
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            You can start promoting as soon as you create an event.
          </p>
          <Button>
          <Link href={`/organization/${orgId}/create-event`}>
            Create Event
          </Link>
          </Button>
        </div>
      </div>}

      {loading &&  <div className={`grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-12 px-[2rem]`}>
        {Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)}
      </div>}

      {!!events.length && <div className="flex justify-center mt-8">
        <Button variant={'ghost'} size={'sm'} onClick={handleShowMore} disabled={loading || !hasMore}>
          <div>See More</div>
        </Button>
      </div>
}
    </div>
  )
}
