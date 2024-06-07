import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Event } from '@/lib/types';
import { formatDate, truncateString } from '@/lib/utils';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deleteEvent } from '@/actions/event.actions';
import { toast } from 'sonner';
import { ApproveButton } from './ApproveButton';

interface Props { 
 event: Event
 delEvent: (eventId: string) => void
}

export const EventCard: React.FC<Props> = ({ event, delEvent }) => {
  const [deletingEvent, setDeletingEvent] = useState(false)

  console.log('This is one event date', event.date)

  const handleDeleteEvent = async () => {
    if (!event?.id) return
    setDeletingEvent(true)
    try {
      const response = await deleteEvent(event.id)
      toast('✅ Deleted Event', {
        description: 'Event deleted successfully',
      })
      setDeletingEvent(false)
      delEvent(event.id)
    } catch (error) {
      console.log(error)
      toast('⛔ Oppse!', {
        description: 'Could not delete your event',
      })
      setDeletingEvent(false)
    }
  }

  return (
    <AlertDialog>
      <div
        className="block cursor-pointer rounded w-[17rem] bg-muted transition-shadow shadow-sm hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_15px_-3px_rgba(249,249,249,0.07),0_10px_20px_-2px_rgba(249,249,249,0.04)]"
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
          <Image
            height={50}
            width={300}
            className="rounded-t w-full h-32 object-cover"
            src={event.banner}
            alt="Event Banner"
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
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
          <div className="flex justify-between my-4">
            <ApproveButton event={event} />
            <div className="flex justify-end">
              <Link href={`/organization/${event?.organizationId}/e/edit//${event?.id}`}>
                <Button size={'icon'} variant={'outline'}>
                  <Pencil className='h-[1rem] w-[1rem]' />
                </Button>
              </Link>
              
              <Button size={'icon'} variant={'outline'} className='ml-2'>
                <AlertDialogTrigger>
                  <Trash className='h-[1rem] w-[1rem] text-destructive' />
                </AlertDialogTrigger>
              </Button>
             
            </div>
          </div>
          <Link href={`/e/${event.id}/${event.slug}`}>
            <Button size={'sm'} variant={'outline'} className='w-full text-sm font-medium uppercase leading-normal'>
              View Details
            </Button>
          </Link>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              This action cannot be undone. This will permanently delete the Event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletingEvent}
              className="bg-destructive hover:bg-destructive"
              onClick={handleDeleteEvent}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
};
