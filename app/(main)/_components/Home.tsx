
'use client'
import { useEffect, useState } from "react";
import { Event } from '@/lib/types';
import { toast } from "sonner";
import { getAllEvents, getCategoryEvents, getHomeEvents } from "@/Firebase/queries";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { Hero } from './Hero'
import { Category } from './Category'
import { CTA } from './CTA'
import { EventList } from './EventList'

export const Home = () => {
    
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const getEvents = async (initial = false) => {
    setLoading(true);
    const orgEvents = await getHomeEvents(8, initial ? null : lastVisible);
    if (orgEvents.error) {
      setLoading(false);
      return toast('⛔ Oops!', { description: 'Could not get events' });
    }

    const newEvents: Event[] = orgEvents.events;
    setEvents((prevEvents) => initial ? newEvents : [...prevEvents, ...newEvents]);
    setLastVisible(orgEvents.lastVisible);
    setHasMore(newEvents.length > 0);
    setLoading(false);
  }

  const getCatEvents = async (initial = false, category: string) => {
    setLoading(true);
    const catEvents = await getCategoryEvents(category, 8, initial ? null : lastVisible);
    if (catEvents.error) {
      setLoading(false);
      return toast('⛔ Oops!', { description: 'Could not get category events' });
    }

    const newEvents: Event[] = catEvents.events;
    setEvents((prevEvents) => initial ? newEvents : [...prevEvents, ...newEvents]);
    setLastVisible(catEvents.lastVisible);
    setHasMore(newEvents.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    getEvents(true);
  }, []);

  const handleShowMore = () => {
    if (hasMore) {
      getEvents();
    }
  };

  return (
    <>
        <Hero />
        <Category />
        <h2 className="flex justify-center md:justify-start text-[1.75rem] font-medium px-[2rem] ">
            Latest Events
        </h2>
        <EventList events={events} loading={loading} handleShowMore={handleShowMore} hasMore={hasMore} />
        <CTA />
    </>
  )
}
