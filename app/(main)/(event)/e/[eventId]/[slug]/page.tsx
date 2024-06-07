
import Head from "next/head";
import {EventDetail} from "../../../_components/EventDetail";
import { getEventById } from "@/actions/event.actions";
import { Event } from "@/lib/types";
import { Metadata, ResolvingMetadata } from "next";

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
   
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: event?.name,
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