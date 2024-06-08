'use client'

import { Event } from '@/lib/types';
import { EventCard } from '../../_components/EventCard';

interface Props {
  events: Event[];
  title: string
}

const SimilarEvent = ({events, title}: Props) => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  return (
    <section
      className="mt-16 mb-1 md:mt-24 md:mb-8"
    >
       <h2 className="flex justify-center md:justify-start text-[1.5rem] font-medium px-[2rem]">
          {title}
        </h2>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-6 px-[2rem]">
        {events?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default SimilarEvent