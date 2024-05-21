import { OrganizationSettings } from './OrganizationSettings'

type Props = {
  params: { organizationId: string };
};

const Page = async ({ params }: Props) => {

  const {organizationId} = params
    
  return ( 
   <OrganizationSettings orgId={organizationId}/>
  )
}

export default Page