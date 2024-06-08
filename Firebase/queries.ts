
import { addDoc, collection, doc, deleteDoc, DocumentReference, updateDoc, getDocs, query, where, setDoc, QueryDocumentSnapshot, getDoc, orderBy, startAfter, limit, collectionGroup, Timestamp, Firestore, FieldPath } from 'firebase/firestore'
import { startOfToday, endOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, addMonths, isAfter, addDays } from 'date-fns';

import { Event, Organization, SearchOptions } from '@/lib/types';
import { db } from './config'

export async function getOrganizationEvents(organizationId: string, pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const eventsCollection = collection(db, 'events');

  try {
    let eventsQuery;
    if (lastVisible) {
      eventsQuery = query(
        eventsCollection,
        where('organizationId', '==', organizationId),
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      eventsQuery = query(
        eventsCollection,
        where('organizationId', '==', organizationId),
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const eventsSnapshot = await getDocs(eventsQuery);

    const events: Event[] = eventsSnapshot.docs.map(doc => {
      const data = doc.data()
      const event: Event = {
        id: doc.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: {
          hours: data.time.hours,
          minutes: data.time.minutes,
          period: data.time.period
        },
        venue: {
          center: data.venue.center,
          region: data.venue.region,
          state: data.venue.state,
          street: data.venue.street,
          zoom: data.venue.zoom
        },
        description: data.description,
        slug: data.slug,
        links: {
          website: data.links.website,
          twitter: data.links.twitter,
          instagram: data.links.instagram,
          linkedin: data.links.linkedin,
        },
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
     return event
    });

    console.log('There are events ', events)

    const newLastVisible = eventsSnapshot.docs.length > 0 ? eventsSnapshot.docs[eventsSnapshot.docs.length - 1] : null;

    return { events, lastVisible: newLastVisible, error: null }

  } catch (e) {
    // handleError(e)
    return { events:[] as Event[], lastVisible: null, error: e }
  }
}

export async function getAllEvents(pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const eventsCollection = collection(db, 'events');

  try {
    let eventsQuery;
    if (lastVisible) {
      eventsQuery = query(
        eventsCollection,
        // where('isApproved', '==', true),
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      eventsQuery = query(
        eventsCollection,
        // where('isApproved', '==', true),
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const eventsSnapshot = await getDocs(eventsQuery);

    const events: Event[] = eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      const event: Event = {
        id: doc.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: {
          hours: data.time.hours,
          minutes: data.time.minutes,
          period: data.time.period
        },
        venue: {
          center: data.venue.center,
          region: data.venue.region,
          state: data.venue.state,
          street: data.venue.street,
          zoom: data.venue.zoom
        },
        description: data.description,
        slug: data.slug,
        links: {
          website: data.links.website,
          twitter: data.links.twitter,
          instagram: data.links.instagram,
          linkedin: data.links.linkedin,
        },
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      return event;
    });

    console.log('There are events ', events);

    const newLastVisible = eventsSnapshot.docs.length > 0 ? eventsSnapshot.docs[eventsSnapshot.docs.length - 1] : null;

    return { events, lastVisible: newLastVisible, error: null };

  } catch (e) {
    // handleError(e)
    return { events: [] as Event[], lastVisible: null, error: e };
  }
}

export async function getHomeEvents(pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const eventsCollection = collection(db, 'events');

  try {
    let eventsQuery;
    if (lastVisible) {
      eventsQuery = query(
        eventsCollection,
        where('isApproved', '==', true),
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      eventsQuery = query(
        eventsCollection,
        where('isApproved', '==', true),
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const eventsSnapshot = await getDocs(eventsQuery);

    const events: Event[] = eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      const event: Event = {
        id: doc.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: {
          hours: data.time.hours,
          minutes: data.time.minutes,
          period: data.time.period
        },
        venue: {
          center: data.venue.center,
          region: data.venue.region,
          state: data.venue.state,
          street: data.venue.street,
          zoom: data.venue.zoom
        },
        description: data.description,
        slug: data.slug,
        links: {
          website: data.links.website,
          twitter: data.links.twitter,
          instagram: data.links.instagram,
          linkedin: data.links.linkedin,
        },
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      return event;
    });

    console.log('There are events ', events);

    const newLastVisible = eventsSnapshot.docs.length > 0 ? eventsSnapshot.docs[eventsSnapshot.docs.length - 1] : null;

    return { events, lastVisible: newLastVisible, error: null };

  } catch (e) {
    // handleError(e)
    console.log('Events error', e)
    return { events: [] as Event[], lastVisible: null, error: e };
  }
}

export async function getCategoryEvents(category: string, pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const eventsCollection = collection(db, 'events');

  try {
    let eventsQuery;
    if (lastVisible) {
      eventsQuery = query(
        eventsCollection,
        where('isApproved', '==', true),
        where('category', '==', category),
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      eventsQuery = query(
        eventsCollection,
        where('isApproved', '==', true),
        where('category', '==', category),
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const eventsSnapshot = await getDocs(eventsQuery);

    const events: Event[] = eventsSnapshot.docs.map(doc => {
      const data = doc.data()
      const event: Event = {
        id: doc.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: {
          hours: data.time.hours,
          minutes: data.time.minutes,
          period: data.time.period
        },
        venue: {
          center: data.venue.center,
          region: data.venue.region,
          state: data.venue.state,
          street: data.venue.street,
          zoom: data.venue.zoom
        },
        description: data.description,
        slug: data.slug,
        links: {
          website: data.links.website,
          twitter: data.links.twitter,
          instagram: data.links.instagram,
          linkedin: data.links.linkedin,
        },
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
     return event
    });

    console.log('There are events ', events)

    const newLastVisible = eventsSnapshot.docs.length > 0 ? eventsSnapshot.docs[eventsSnapshot.docs.length - 1] : null;

    return { events, lastVisible: newLastVisible, error: null }

  } catch (e) {
    // handleError(e)
    return { events:[] as Event[], lastVisible: null, error: e }
  }
}

export async function getEventById(eventId: string) {
  try {
    const eventDocRef = doc(db, 'events', eventId);
    const eventDocSnap = await getDoc(eventDocRef);

    if (eventDocSnap.exists()) {
      const data = eventDocSnap.data();
      const event: Event = {
        id: eventDocSnap.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: {
          hours: data.time.hours,
          minutes: data.time.minutes,
          period: data.time.period
        },
        venue: {
          center: data.venue.center,
          region: data.venue.region,
          state: data.venue.state,
          street: data.venue.street,
          zoom: data.venue.zoom
        },
        description: data.description,
        slug: data.slug,
        links: {
          website: data.links.website,
          twitter: data.links.twitter,
          instagram: data.links.instagram,
          linkedin: data.links.linkedin,
        },
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };

      console.log('Event found: ', event);
      return { event, error: null };
    } else {
      console.log('No such document!');
      return { event: null, error: 'No such document' };
    }
  } catch (e) {
    console.error('Error getting document: ', e);
    return { event: null, error: e };
  }
}

export async function getOrganizationById(organizationId: string) {
  try {
    const organizationDocRef = doc(db, 'organizations', organizationId);
    const organizationDocSnap = await getDoc(organizationDocRef);

    if (organizationDocSnap.exists()) {
      const data = organizationDocSnap.data();
      const organization: Organization = {
        id: organizationDocSnap.id,
        userId: data.userId,
        name: data.name,
        logo: data.logo,
        organizationEmail: data.organizationEmail,
        organizationPhone: data.organizationPhone,
        website: data.website,
        description: data.description,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        state: data.state,
      };

      console.log('Organization found: ', organization);
      return { organization, error: null };
    } else {
      console.log('No such document!');
      return { organization: null, error: 'No such document' };
    }
  } catch (e) {
    console.error('Error getting document: ', e);
    return { organization: null, error: e };
  }
}

// export const searchEvents = async (options: SearchOptions, setEvents: (events: Event[]) => void) => {
//   try {
//     let q = collectionGroup(db, 'events');

//     if (options.searchTerm) {
//       q = query(q, where('name', '==', options.searchTerm));

//     }
//     if (options.category) {
//       q = query(q, where('category', '==', options.category));
//     }
//     if (options.venue) {
//       q = query(q, where('state', '==', options.venue));
//     }
//     if (options.date) {
//       const [beginningDate, endDate] = getDateRange(options.date);

//       if(options.date === 'Today') {
//         const [beyondDate = beginningDate, endDate] = getDateRange('Beyond');
//         q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)), where('eventDate', '<=', convertToTimestamp(beyondDate)));
//       }

//       if(options.date === 'Beyond') {
//         console.log('This is the date for today', beginningDate)
//         q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)));
//       }

//       if(options.date !== 'Today' && options.date !== 'Beyond') {
//         console.log('This is the date for' + options.date, beginningDate, endDate)
//         q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)), where('eventDate', '<=', convertToTimestamp(endDate)));
//       }


//     }
    
//     if (options.price) {
//       if(options.price === 'Free') {
//         q = query(q, where('isFree', '==', true));
//       } else {
//         q = query(q, where('isFree', '==', false));
//       }
      
//     }

//     const querySnapshot = await getDocs( q);
//     const firebaseEvents: Event[] = [];

//     querySnapshot.forEach((doc) => {
//       firebaseEvents.push({ data: doc.data(), id: doc.id });
//     });

//     setEvents(firebaseEvents);
//   } catch (error: any) {
//     console.error(error);
//     errorMessage(error)
//   }
// };

export async function searchEvents(searchParams: SearchOptions, pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const eventsCollection = collection(db, 'events');
  
  try {
    let eventsQuery = query(eventsCollection, where('isApproved', '==', true));

    if (searchParams.searchTerm) {
      eventsQuery = query(eventsQuery, where('name', '==', searchParams.searchTerm));
    }

    if (searchParams.category) {
      eventsQuery = query(eventsQuery, where('category', '==', searchParams.category));
    }

    if (searchParams.date) {
      const now = new Date();
      let startDate: Date = new Date(), endDate: Date = new Date();

     
      
      switch (searchParams.date.toLowerCase()) {
        case 'today':
          startDate = startOfToday();
          endDate = endOfToday();
          break;
        case 'this week':
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          break;
        case 'this weekend':
          startDate = addDays(startOfWeek(now, { weekStartsOn: 1 }), 5); // Saturday
          endDate = addDays(startDate, 1); // Sunday
          break;
        case 'next week':
          startDate = startOfWeek(addWeeks(now, 1));
          endDate = endOfWeek(addWeeks(now, 1));
          break;
        case 'this month':
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case 'next month':
          startDate = startOfMonth(addMonths(now, 1));
          endDate = endOfMonth(addMonths(now, 1));
          break;
        case 'beyond':
          startDate = endOfMonth(addMonths(now, 1));
          endDate = new Date(9999, 11, 31); // Far future date
          break;
        default:
          break;
      }

      if (startDate && endDate) {
        console.log('The current start date', startDate)
        console.log('The current end date', endDate)
        eventsQuery = query(
          eventsQuery,
          where(new FieldPath('date', 'from'), '<=', Timestamp.fromDate(endDate)),
          where(new FieldPath('date', 'to'), '>=', Timestamp.fromDate(startDate))
        );
      }
    }

    if (searchParams.venue) {
      eventsQuery = query(eventsQuery, where(new FieldPath('venue', 'state'), '==', searchParams.venue));
    }

    if (searchParams.price) {
      const isFree = searchParams.price.toLowerCase() === 'free';
      eventsQuery = query(eventsQuery, where('isFree', '==', isFree));
    }

    if (lastVisible) {
      eventsQuery = query(eventsQuery, orderBy('createdAt'), startAfter(lastVisible), limit(pageSize));
    } else {
      eventsQuery = query(eventsQuery, orderBy('createdAt'), limit(pageSize));
    }

    const eventsSnapshot = await getDocs(eventsQuery);

    const events: Event[] = eventsSnapshot.docs.map(doc => {
      const data = doc.data() as Event;
      return {
        id: doc.id,
        organizationId: data.organizationId,
        name: data.name,
        banner: data.banner,
        category: data.category,
        price: data.price,
        isFree: data.isFree,
        date: {
          from: data.date.from,
          to: data.date.to
        },
        time: data.time,
        venue: data.venue,
        description: data.description,
        slug: data.slug,
        links: data.links,
        isApproved: data.isApproved,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    });

    const newLastVisible = eventsSnapshot.docs.length > 0 ? eventsSnapshot.docs[eventsSnapshot.docs.length - 1] : null;

    return { events, lastVisible: newLastVisible, error: null };
  } catch (e) {
    console.error("Error fetching events:", e);
    return { events: [] as Event[], lastVisible: null, error: e };
  }
}


