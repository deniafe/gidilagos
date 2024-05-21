'use server'

import { revalidatePath } from 'next/cache'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, updateDoc, getDoc, setDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { User } from '@/lib/types';


export async function createUser (userAuth: User) {

  let app: any = await getApp();
  if(!app) return;
  const db = getFirestore(app);

  const userDocRef = doc(db, 'users', userAuth.clerkId);

  const userSnapshot = await getDoc(userDocRef);

  let user = null,
    error = null

  if (!userSnapshot.exists()) {
    const { firstName, lastName, email, username, avatarUrl } = userAuth;
    const createdAt = new Date();
    const updatedAt = new Date();

    try {
      await setDoc(userDocRef, {
        firstName,
        lastName,
        email,
        username,
        avatarUrl,
        createdAt,
        updatedAt,
      });

      user = userSnapshot as QueryDocumentSnapshot<User>
  

      // sendEmail(userAuth)

      // successMessage("Authentication successful 🎉")

    } catch (e) {
      error = e
      console.log('error creating the user', e);
      // errorMessage(e + "❌")
    }
  }

  return {user, error}
};

export async function deleteUser(userId: string) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);
  const userDocRef = doc(db, 'users', userId);

  try {
    await deleteDoc(userDocRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: "Failed to delete user." };
  }
}

export async function updateUser(userId: string, userData: Partial<User>) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);
  const userDocRef = doc(db, 'users', userId);

  try {
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      return { error: "User not found." };
    }

    const updatedAt = new Date();
    const newData = { ...userData, updatedAt };

    await updateDoc(userDocRef, newData);

    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: "Failed to update user." };
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