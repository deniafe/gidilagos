import { EventForm } from '../_components/EventForm';

type Props = {
  params: { organizationId: string };
};

const Page = async ({ params }: Props) => {

  const {organizationId} = params
    
  return ( 
   <EventForm orgId={organizationId}/>
  )
}

export default Page