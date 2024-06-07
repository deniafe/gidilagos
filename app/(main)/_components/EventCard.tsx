import Image from 'next/image';
import React from 'react';
import { Event } from '@/lib/types';
import { formatDate, truncateString } from '@/lib/utils';
import { ShareButton } from './Share';
import { useRouter } from 'next/navigation';

interface Props {
  event: Event;
}

export const EventCard: React.FC<Props> = ({ event }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/e/${event.id}/${event.slug}`)}
      className="block cursor-pointer rounded w-[17rem] bg-muted transition-shadow shadow-sm hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_15px_-3px_rgba(249,249,249,0.07),0_10px_20px_-2px_rgba(249,249,249,0.04)] relative group"
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
        <Image
          height={50}
          width={300}
          className="rounded-t w-full h-36 object-cover"
          src={event.banner}
          alt="Event Banner"
        />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
        <div className="absolute bottom-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ShareButton link={`https://gidiopolis.com/e/${event.id}/${event.slug}`} />
        </div>
      </div>
      <div className="px-3 py-8">
        <h5 className="mb-2 text-lg font-bold leading-tight">
          {truncateString(event.name, 25)}
        </h5>
        <p className="mb-1 text-xs font-bold text-muted-foreground">
          {event.date.from && formatDate(event.date.from)} to {event.date.to && formatDate(event.date.to)}
        </p>
        <p className="mb-2 text-xs font-bold text-muted-foreground">
          {event.time.hours} : {event.time.minutes < 10 ? `0${event.time.minutes}` : event.time.minutes} {event.time.period}
        </p>
        <p className="mb-2 text-sm text-muted-foreground">
          {event.venue.street}, {event.venue.region}, {event.venue.state}
        </p>
        <p
          className="w-10 rounded text-center text-white text-xs dark:text-neutral-200"
          style={{ background: event.isFree ? '#31859C' : '#77933C' }}
        >
          {event.isFree ? "Free" : "Paid"}
        </p>
      </div>
    </div>
  );
}
