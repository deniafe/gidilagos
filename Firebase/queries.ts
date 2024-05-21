
import { addDoc, collection, doc, deleteDoc, DocumentReference, updateDoc, getDocs, query, where, setDoc, QueryDocumentSnapshot, getDoc } from 'firebase/firestore'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { db } from './config'
import { User } from '@/lib/types';

interface AddDataResult {
  result: void| null | DocumentReference;
  error: any;
}

interface EditDataResult {
  result: void| null | string;
  error: any;
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
) => {

  if (!userAuth) return;

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

      // await clerkClient.users.updateUserMetadata(user.id, {
      //   privateMetadata: {
      //     role: role || 'SUBACCOUNT_USER',
      //   },
      // })
  

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


export const updateUserInFirestore = async (userId: string, newDisplayName: string, newEmail: string) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    await updateDoc(userDocRef, {
      displayName: newDisplayName,
      email: newEmail,
    });
    console.log('Profile updated successfully in Firestore.');
  } catch (error) {
    console.error('Error updating profile in Firestore:', error);
  }
};

export async function addData(
  col: string,
  data: Record<string, any>
): Promise<AddDataResult> {

  let result: void| null | DocumentReference = null;
  let error: any = null;

  try {
    result = await addDoc(collection(db, col), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function updateData(
  col: string,
  docId: string,
  data: Record<string, any>
): Promise<EditDataResult> {

  let result: void | null | string= null;
  let error: any = null;

  console.log('details for updating', col, docId)

  try {
    console.log('details for updating', col, docId)
    const docRef = doc(db, col, docId);
    const updatedResult = await updateDoc(docRef, data);
    console.log('Document updated result', updatedResult);
    result = 'Data successfully updated';
  } catch (e) {
    error = e;
    // console.log('Error updating', e)
  }

  return { result, error };
}

export async function deleteData (col: string, docId: string) {
  const user = await currentUser();
  if (!user) {
    return;
  }

  try {
    await deleteDoc(doc(db, col, docId));
    return `${col} deleted successfully`;
  } catch (error) {
    console.error(`Error deleting ${col}:`, error);
    throw error;
  }
};

