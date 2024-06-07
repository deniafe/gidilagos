'use server'

import { revalidatePath } from 'next/cache'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, deleteDoc, updateDoc, getDoc, DocumentReference, query, where, getDocs, orderBy, startAfter, limit, QueryDocumentSnapshot } from 'firebase/firestore';
import { Event } from '@/lib/types';
import { handleError } from '@/lib/utils';


export async function getOrganizationEvents(organizationId: string, pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  let app: any = await getApp();
  if (!app) return JSON.stringify({ events:[] as Event[], lastVisible: null, error: null })
  const db = getFirestore(app);
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

    return JSON.stringify({ events, lastVisible: newLastVisible, error: null })

  } catch (e) {
    // handleError(e)
    return JSON.stringify({ events:[] as Event[], lastVisible: null, error: e })
  }
}
 
export async function getEventById(eventId: string) {
  let app: any = await getApp();
  if (!app) return { events:[] as Event[], lastVisible: null, error: null }
  const db = getFirestore(app);

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

export async function createEvent(event: Partial<Event>) {
  let app: any = await getApp();
  if (!app) return [] as Event[];
  const db = getFirestore(app);

  let result: void| null | DocumentReference = null;

  try {
    const updatedAt = new Date();
    const createdAt = new Date();
    const eventData = { ...event, updatedAt, createdAt };
    result = await addDoc(collection(db, 'events'), eventData);
    // return JSON.parse(JSON.stringify(result))
    return { success: true };
  } catch (e) {
    handleError(e)
    return [] as Event[];
  }
}

export async function deleteEvent(eventId: string) {
  let app: any = await getApp();
  if (!app) return [] as Event[];

  const db = getFirestore(app);
  const eventDocRef = doc(db, 'events', eventId);

  try {
    await deleteDoc(eventDocRef);
    // revalidatePath(path)
    return { success: true };
  } catch (e) {
    handleError(e)
    return [] as Event[];
  }
}

export async function updateEvent(eventId: string, eventData: Partial<Event>) {
  let app: any = await getApp();
  if (!app) return [] as Event[];

  const db = getFirestore(app);

  const eventDocRef = doc(db, 'events', eventId);

  try {
    const eventSnapshot = await getDoc(eventDocRef);
    if (!eventSnapshot.exists()) {
      return { error: "Event not found." };
    }

    const updatedAt = new Date();
    const newData = { ...eventData, updatedAt };

    await updateDoc(eventDocRef, newData);
    return { success: true };
  } catch (e) {
    handleError(e)
    return [] as Event[];
  }
}


function getApp () {
  
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

  return new Promise((resolve, reject) => {

      try {
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          resolve(app);
      } catch (error) {
          resolve(null);
      }
      
  })
}