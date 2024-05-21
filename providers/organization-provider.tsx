'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Organization } from '@/lib/types';
import { getAllOrganizations } from '@/actions/organization.actions';

interface OrganizationProviderProps {
  children: React.ReactNode;
}

type OrganizationContextType = {
  isLoading: boolean;
  currentOrganizationId: string;
  currentOrganization: Organization | null;
  organizations: Organization[];
  setCurrentOrganizationId: (orgId: string) => void;
  setCurrentOrganization: (org: Organization) => void;
  setOrganizations: (orgs: Organization[]) => void;
  getCurrentOrganization: () => Organization | null;
};

export const OrganizationContext = createContext<OrganizationContextType>({
  isLoading: false,
  currentOrganizationId: '',
  currentOrganization: null,
  organizations: [],
  setCurrentOrganizationId: (orgId: string) => {},
  setCurrentOrganization: (org: Organization) => {},
  setOrganizations: (orgs: Organization[]) => {},
  getCurrentOrganization: () => null,
});

const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string>('');
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
    const getOrgs = async () => {
      const orgs = await getAllOrganizations();
      setOrganizations(orgs);
      setIsLoading(false);
    }
    getOrgs();
  }, []);

  const getCurrentOrganization = useCallback((): Organization | null => {
    return organizations.find(org => org.id === currentOrganizationId) || null;
  }, [currentOrganizationId, organizations]);

  if (!isMounted) return null;

  return (
    <OrganizationContext.Provider value={{
      isLoading,
      currentOrganization,
      currentOrganizationId,
      organizations,
      setCurrentOrganization,
      setOrganizations,
      setCurrentOrganizationId,
      getCurrentOrganization
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within the organization provider');
  }
  return context;
};

export default OrganizationProvider;
