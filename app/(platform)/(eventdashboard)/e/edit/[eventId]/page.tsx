import { EditEvent } from "./EditEvent";

type Props = {
  params: { organizationId: string, eventId: string };
};

const Page = async ({ params }: Props) => {

  const {eventId} = params
    
  return ( 
   <EditEvent eventId={eventId}/>
  )
}

export default Page