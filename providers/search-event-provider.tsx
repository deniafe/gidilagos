'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { Event } from '@/lib/types';

interface SearchEventProviderProps {
  children: React.ReactNode;
}

type SearchEventContextType = {
  searchEvents: Event[];
  setSearchEvents: (events: Event[]) => void;
};

export const SearchEventContext = createContext<SearchEventContextType>({
  searchEvents: [],
  setSearchEvents: (events: Event[]) => {},
});

const SearchEventProvider: React.FC<SearchEventProviderProps> = ({ children }) => {
  const [searchEvents, setSearchEvents] = useState<Event[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You can fetch search event data here on component mount if needed
    // Example: fetchSearchEventData().then((events) => setSearchEvents(events));
  }, []);

  if (!isMounted) return null;

  return (
    <SearchEventContext.Provider value={{ searchEvents, setSearchEvents }}>
      {children}
    </SearchEventContext.Provider>
  );
};

export const useSearchEvents = () => {
  const context = useContext(SearchEventContext);
  if (!context) {
    throw new Error('useSearchEvents must be used within the search event provider');
  }
  return context;
};

export default SearchEventProvider;
