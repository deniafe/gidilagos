'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { Event } from '@/lib/types';

interface EventProviderProps {
  children: React.ReactNode;
}

type EventContextType = {
  events: Event[];
  setEvents: (events: Event[]) => void;
};

export const EventContext = createContext<EventContextType>({
  events: [],
  setEvents: (events: Event[]) => {},
});

const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You can fetch event data here on component mount if needed
    // Example: fetchEventData().then((events) => setEvents(events));
  }, []);

  if (!isMounted) return null;

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within the event provider');
  }
  return context;
};

export default EventProvider;
