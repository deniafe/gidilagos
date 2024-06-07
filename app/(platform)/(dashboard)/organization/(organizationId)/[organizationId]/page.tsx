import { OrganizationEventList } from "./OrganizationEventList"

type Props = {
  params: { organizationId: string };
};

async function OrganizationIdPage({ params }: Props) {  

  const {organizationId} = params

  return (
   <OrganizationEventList orgId={organizationId} />
  )
}

export default OrganizationIdPage