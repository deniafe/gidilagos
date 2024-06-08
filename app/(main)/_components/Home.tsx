'use client'
import { useEffect, useState } from "react";
import { Event } from '@/lib/types';
import { toast } from "sonner";
import { getAllEvents, getCategoryEvents, getHomeEvents } from "@/Firebase/queries";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { Hero } from './Hero';
import { Category } from './Category';
import { CTA } from './CTA';
import { EventList } from './EventList';

export const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [categoryEvents, setCategoryEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [catLastVisible, setCatLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [catHasMore, setCatHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
  };

  const getCatEvents = async (initial = false, category: string) => {
    setLoading(true);
    console.log('About to get category events', category)
    const catEvents = await getCategoryEvents(category, 8, initial ? null : catLastVisible);
    if (catEvents.error) {
      setLoading(false);
      console.log('There was an error', catEvents.error)
      return toast('⛔ Oops!', { description: 'Could not get category events' });
    }

    const newEvents: Event[] = catEvents.events;
    setCategoryEvents((prevEvents) => initial ? newEvents : [...prevEvents, ...newEvents]);
    setCatLastVisible(catEvents.lastVisible);
    setCatHasMore(newEvents.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    getEvents(true);
  }, []);

  const handleShowMore = () => {
    if (selectedCategory === 'All' && hasMore) {
      getEvents();
    } else if (catHasMore) {
      getCatEvents(false, selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      getEvents(true);
    } else {
      getCatEvents(true, category);
    }
  };

  return (
    <>
      <Hero />
      <Category selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <h2 className="flex justify-center md:justify-start text-[1.75rem] font-medium px-[2rem] ">
        Latest Events
      </h2>
      <EventList
        events={selectedCategory === 'All' ? events : categoryEvents}
        loading={loading}
        handleShowMore={handleShowMore}
        hasMore={selectedCategory === 'All' ? hasMore : catHasMore}
      />
      <CTA />
    </>
  );
};
