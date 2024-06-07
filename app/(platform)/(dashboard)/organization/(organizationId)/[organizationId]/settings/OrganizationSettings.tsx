'use client'
import { OrganizationDetails } from '@/components/forms/OrganizationDetails'
import { useOrganization } from '@/providers/organization-provider';

type Props = {
  orgId: string
};

export const OrganizationSettings = ({orgId}: Props) => {
  const { getCurrentOrganization, setCurrentOrganizationId } = useOrganization();
  setCurrentOrganizationId(orgId)
  const currentOrg = getCurrentOrganization();


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
    </div>
    <div
      className="flex flex-1 items-center justify-center rounded-lg shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <OrganizationDetails
          data={currentOrg || undefined}
        />
      </div> 
    </div>
  </div>
  )
}
