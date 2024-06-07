import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { handleError } from '@/lib/utils';

function getApp() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  return new Promise((resolve, reject) => {
    try {
      const app = initializeApp(firebaseConfig);
      resolve(app);
    } catch (error) {
      resolve(null);
    }
  });
}

export async function subscribeUser(email: string) {
    let app: any = await getApp();
    if (!app) return { error: "Firebase app initialization failed." };
  
    const db = getFirestore(app);
    const subscriptionsCollection = collection(db, 'newsletterSubscriptions');
  
    try {
      // Check if the email is already subscribed
      const q = query(subscriptionsCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        return { error: "Email is already subscribed." };
      }
  
      // If not subscribed, add the new subscription
      const createdAt = new Date();
      const subscriptionData = { email, createdAt };
  
      await addDoc(subscriptionsCollection, subscriptionData);
      return { success: true };
    } catch (e) {
      handleError(e);
      return { error: "Failed to subscribe user." };
    }
  }

export async function unsubscribeUser(email: string) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);
  const subscriptionsCollection = collection(db, 'newsletterSubscriptions');

  try {
    const q = query(subscriptionsCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { error: "Subscription not found." };
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return { success: true };
  } catch (e) {
    handleError(e);
    return { error: "Failed to unsubscribe user." };
  }
}
