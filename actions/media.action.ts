'use server'

import { revalidatePath } from 'next/cache'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, deleteDoc, updateDoc, getDoc, DocumentReference, getDocs, query, startAfter, limit } from 'firebase/firestore';
import { Media } from '@/lib/types';
import { handleError } from '@/lib/utils';


export async function getAllMedia() {
  let app: any = await getApp();
  if (!app) return [] as Media[];

  const db = getFirestore(app);

  try {
    const mediaCollection = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaCollection);

    const media: Media[] = [];
    mediaSnapshot.forEach((doc) => {
      media.push({ id: doc.id, ...doc.data() } as Media);
    });

    return media;
  } catch (error) {
    handleError(error);
    return [] as Media[];
  }
}

export async function createMedia(media: Partial<Media>) {
  let app: any = await getApp();
  if(!app) return;
  const db = getFirestore(app);

  let result: void | null | DocumentReference = null;

  try {
    const updatedAt = new Date();
    const createdAt = new Date();
    const mediaData = { ...media, updatedAt, createdAt };
    result = await addDoc(collection(db, 'media'), mediaData);
    return { success: true };
  } catch (e) {
    handleError(e)
  }
}

export async function deleteMedia(mediaId: string) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);
  const mediaDocRef = doc(db, 'media', mediaId);

  try {
    await deleteDoc(mediaDocRef);
    return { success: true };
  } catch (e) {
    handleError(e)
  }
}

export async function updateMedia(mediaId: string, mediaData: Partial<Media>) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);

  const mediaDocRef = doc(db, 'media', mediaId);

  try {
    const mediaSnapshot = await getDoc(mediaDocRef);
    if (!mediaSnapshot.exists()) {
      return { error: "Media not found." };
    }

    const updatedAt = new Date();
    const newData = { ...mediaData, updatedAt };

    await updateDoc(mediaDocRef, newData);

    return { success: true };
  } catch (e) {
    handleError(e)
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

