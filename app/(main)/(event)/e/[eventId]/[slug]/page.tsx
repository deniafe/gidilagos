
import Head from "next/head";
import {EventDetail} from "../../../_components/EventDetail";
import { getEventById } from "@/actions/event.actions";
import { Metadata, ResolvingMetadata } from "next";
import { truncateString } from "@/lib/utils";

type Props = {
  params: { eventId: string };
};

  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const eventId = params.eventId
   
    // fetch data
    const result = await getEventById(eventId)

    if(result.error) return {} as Metadata

    const event = result.event
    const desc = truncateString(event?.description || '', 50)
   
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: event?.name,
      description: desc,
      openGraph: {
        images: [event?.banner || '' , ...previousImages],
      },
    }
  }

export default async function Page( { params } : Props ) {

    const {eventId} = params

  return ( 
    <main className="md:px-[2rem]">
      <EventDetail eventId={eventId} />
    </main>
  )
}