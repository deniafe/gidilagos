'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { Event } from '@/lib/types';

interface OrganizationEventProviderProps {
  children: React.ReactNode;
}

type OrganizationEventContextType = {
  organizationEvents: Event[];
  setOrganizationEvents: (events: Event[]) => void;
};

export const OrganizationEventContext = createContext<OrganizationEventContextType>({
  organizationEvents: [],
  setOrganizationEvents: (events: Event[]) => {},
});

const OrganizationEventProvider: React.FC<OrganizationEventProviderProps> = ({ children }) => {
  const [organizationEvents, setOrganizationEvents] = useState<Event[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You can fetch organization event data here on component mount if needed
    // Example: fetchOrganizationEventData().then((events) => setOrganizationEvents(events));
  }, []);

  if (!isMounted) return null;

  return (
    <OrganizationEventContext.Provider value={{ organizationEvents, setOrganizationEvents }}>
      {children}
    </OrganizationEventContext.Provider>
  );
};

export const useOrganizationEvents = () => {
  const context = useContext(OrganizationEventContext);
  if (!context) {
    throw new Error('useOrganizationEvents must be used within the organization event provider');
  }
  return context;
};

export default OrganizationEventProvider;
