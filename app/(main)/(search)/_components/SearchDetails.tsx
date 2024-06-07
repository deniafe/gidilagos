'use client'
import { useSearchParams } from "next/navigation";
import { EventList } from "../../_components/EventList";
import { SearchBox } from "../../_components/SearchBox";
import { useEffect, useState } from "react";
import { Event, SearchOptions } from "@/lib/types";
import { searchEvents } from "@/Firebase/queries";
import { toast } from "sonner";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const SearchDetails = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);


  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const category = searchParams.get("category")
  const venue = searchParams.get("venue")
  const price = searchParams.get("price")
  const date = searchParams.get("date")

  const initEvents = async (initial = false) => {
    setLoading(true);
    const options: SearchOptions = {}
    if (query) {
      options.searchTerm = query
    }
    if (category) {
      options.category = category
    }
    if (venue) {
      options.venue = venue
    }
    if (price) {
      options.price = price
    }
    if (date) {
      options.date = date
    }
    const result = await searchEvents(options, 8, initial ? null : lastVisible);
    if (result.error) {
      setLoading(false);
      console.log('Erorrrrrrrrrrrrrrrrr', result.error)
      return toast('⛔ Oops!', { description: 'Could not get events' });
    }

    const searchResultEvents: Event[] = result.events;
    // setEvents(searchResultEvents);

    setEvents((prevEvents) => initial ? searchResultEvents : [...prevEvents, ...searchResultEvents]);
    setLastVisible(result.lastVisible);
    setHasMore(searchResultEvents.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    initEvents(true);
    
  }, []);

const handleShowMore = () => {
    if (hasMore) {
        initEvents();
    }
};


  useEffect(() => {
    // Function to scroll to the element with id "scroll"
    const scrollToScrollDiv = () => {
      const scrollDiv = document.getElementById("scroll");
      if (scrollDiv) {
        // Use the scrollTo method to scroll to the element's top position
        scrollDiv.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Call the scrollToScrollDiv function when the component mounts
    scrollToScrollDiv();
  }, []); 

  return (
    <div className="md:px-[2rem]">
        <div id="scroll" className="flex justify-center">
            <div className="w-full sm:w-4/5 md:w-4/6 lg:w-3/5">
                <SearchBox />
            </div>
        </div>
        <h2 className="flex justify-center md:justify-start text-[1.75rem] font-medium px-[2rem] mt-16">
            Search Results
        </h2>
      <EventList loading={loading} events={events} hasMore={hasMore} handleShowMore={handleShowMore} />
    </div>
  )
}
