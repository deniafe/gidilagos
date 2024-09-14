import { EditEvent } from "./EditEvent";

type Props = {
  params: { organizationId: string, eventId: string };
};

const Page = async ({ params }: Props) => {

  const {organizationId, eventId} = params
    
  return ( 
   <EditEvent orgId={organizationId} eventId={eventId}/>
  )
}

export default Page