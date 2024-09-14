import { UserEventList } from "./UserEventList"

type Props = {
  params: { organizationId: string };
};

async function OrganizationIdPage({ params }: Props) {  

  const {organizationId} = params

  return (
   <UserEventList />
  )
}

export default OrganizationIdPage