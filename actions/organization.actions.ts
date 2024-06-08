'use server'

import { revalidatePath } from 'next/cache'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, deleteDoc, updateDoc, getDoc, DocumentReference, getDocs, query, startAfter, limit, where } from 'firebase/firestore';
import { Organization } from '@/lib/types';
import { handleError } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';


// export async function getAllOrganizations(userId: string): Promise<Organization[]> {
//   let app: any = await getApp();
//   if (!app) return [] as Organization[]

//   const db = getFirestore(app);
//   const user = currentUser();

//   try {
//     const orgCollection = collection(db, 'organizations');
//     const orgSnapshot = await getDocs(orgCollection);

//     const organizations: Organization[] = [];
//     orgSnapshot.forEach((doc) => {
//       organizations.push({ id: doc.id, ...doc.data() } as Organization);
//     });

//     return organizations;
//   } catch (error) {
//     handleError(error);
//     return [] as Organization[]
//   }
// } 

export async function getAllOrganizations(): Promise<Organization[]> {
  let app: any = await getApp();
  if (!app) return [] as Organization[];

  const db = getFirestore(app);
  const user = await currentUser();
  const userId = user?.id || ''

  try {
    const orgCollection = collection(db, 'organizations');
    const orgQuery = query(orgCollection, where('userId', '==', userId));
    const orgSnapshot = await getDocs(orgQuery);

    const organizations: Organization[] = [];
    orgSnapshot.forEach((doc) => {
      organizations.push({ id: doc.id, ...doc.data() } as Organization);
    });

    console.log('Trying to get the organizatiosn from the server')

    return organizations;
  } catch (error) {
    handleError(error);
    return [] as Organization[];
  }
}

export async function getAdminOrganizations(): Promise<Organization[]> {
  let app: any = await getApp();
  if (!app) return [] as Organization[];

  const db = getFirestore(app);

  try {
    const orgCollection = collection(db, 'organizations');
    const orgQuery = query(orgCollection);
    const orgSnapshot = await getDocs(orgQuery);

    const organizations: Organization[] = [];
    orgSnapshot.forEach((doc) => {
      organizations.push({ id: doc.id, ...doc.data() } as Organization);
    });

    console.log('Trying to get the organizatiosn from the server')

    return organizations;
  } catch (error) {
    handleError(error);
    return [] as Organization[];
  }
}

// export async function paginateOrganizations(pageSize: number, startAfterDocId?: string): Promise<{ organizations: Organization[], lastDocId?: string } | { error: string }> {
//   let app: any = await getApp();
//   if (!app) return { error: "Firebase app initialization failed." };

//   const db = getFirestore(app);

//   try {
//     let orgQuery = query(collection(db, 'organizations'));

//     if (startAfterDocId) {
//       const startAfterDoc = await getDoc(doc(db, 'organizations', startAfterDocId));
//       orgQuery = startAfter(startAfterDoc), orgQuery;
//     }

//     orgQuery = limit(orgQuery, pageSize);

//     const orgSnapshot = await getDocs(orgQuery);

//     const organizations: Organization[] = [];
//     let lastDocId: string | undefined;

//     orgSnapshot.forEach((doc) => {
//       organizations.push({ id: doc.id, ...doc.data() } as Organization);
//       lastDocId = doc.id;
//     });

//     return { organizations, lastDocId };
//   } catch (error) {
//     handleError(error);
//     return { error: "Failed to retrieve organizations." };
//   }
// }

export async function createOrganization(organization: Organization) {
  let app: any = await getApp();
  if(!app) return;
  const db = getFirestore(app);

  let result: void| null | DocumentReference = null;

  try {
    const updatedAt = new Date();
    const createdAt = new Date();
    const organizationData = { ...organization, updatedAt, createdAt };
    result = await addDoc(collection(db, 'organizations'), organizationData);
    // return JSON.parse(JSON.stringify(result))
    revalidatePath("/organization")
    return { success: true };
  } catch (e) {
    handleError(e)
  }
}

export async function deleteOrganization(organizationId: string) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);
  const organizationDocRef = doc(db, 'organizations', organizationId);

  try {
    await deleteDoc(organizationDocRef);
    revalidatePath("/organization")
    return { success: true };
  } catch (e) {
    handleError(e)
  }
}

export async function updateOrganization(organizationId: string, organizationData: Partial<Organization>) {
  let app: any = await getApp();
  if (!app) return { error: "Firebase app initialization failed." };

  const db = getFirestore(app);

  const organizationDocRef = doc(db, 'organizations', organizationId);

  try {
    const organizationSnapshot = await getDoc(organizationDocRef);
    if (!organizationSnapshot.exists()) {
      return { error: "Organization not found." };
    }

    const updatedAt = new Date();
    const newData = { ...organizationData, updatedAt };

    await updateDoc(organizationDocRef, newData);

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


// const pageSize = 10; // Number of organizations per page
// const nextPageStartAfterDocId = ''; // Provide the document ID to start pagination after

// paginateOrganizations(pageSize, nextPageStartAfterDocId)
//   .then(({ organizations, lastDocId }) => {
//     // Process organizations
//     console.log("Organizations:", organizations);
//     console.log("Last document ID:", lastDocId);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });