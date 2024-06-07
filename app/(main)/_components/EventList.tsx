'use client'

import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/app/(main)/_components/SkeletonCard";
import { EventCard } from "./EventCard";
import { Empty } from "@/components/global/Empty";
import { Event } from '@/lib/types';

type Props = {
    loading: boolean
    events: Event[]
    handleShowMore: () => void
    hasMore: boolean
}

export const EventList = ({loading, events, handleShowMore, hasMore}: Props) => {
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {events && (
        <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
          {events.map((event) => (
            <div className="flex justify-center md:justify-start mb-4" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

     {loading && (
        <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
        {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      )}

    { !events.length && !loading && <div
        className="flex flex-1 items-center justify-center rounded-lg shadow-sm"
      >
        <Empty />
      </div>}

      {!!events.length && <div className="flex justify-center mt-8">
        <Button variant={'ghost'} size={'sm'} onClick={handleShowMore} disabled={loading || !hasMore}>
          <div>See More</div>
        </Button>
      </div>}
    </div>
  );
};
