'use client'
import { Button } from "@/components/ui/button"
import { useOrganization } from "@/providers/organization-provider"
import { useEffect } from "react";

type Props = {
  orgId: string
};

export const OrganizationEventList = ({orgId}: Props) => {

  const {setCurrentOrganizationId} = useOrganization()

  useEffect(() => {
    setCurrentOrganizationId(orgId)
  }, [orgId])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-screen">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Events
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            You can start promoting as soon as you create an event.
          </p>
          <Button>Create Event</Button>
        </div>
      </div>
    </div>
  )
}
