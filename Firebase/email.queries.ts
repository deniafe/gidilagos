
import { addDoc, collection, doc, deleteDoc, updateDoc, getDoc, DocumentReference, query, getDocs, orderBy, startAfter, limit, QueryDocumentSnapshot } from 'firebase/firestore';
import { Email, NewsletterSubscription } from '@/lib/types';
import { handleError } from '@/lib/utils';
import { db } from './config';

export async function getEmails( pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {

  const emailsCollection = collection(db, 'emails');

  try {
    let emailsQuery;
    if (lastVisible) {
      emailsQuery = query(
        emailsCollection,
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      emailsQuery = query(
        emailsCollection,
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const emailsSnapshot = await getDocs(emailsQuery);

    const emails: Email[] = emailsSnapshot.docs.map(doc => {
      const data = doc.data()
      const email: Email = {
        id: doc.id,
        name: data.name,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        description: data.description,
        content: data.content,
        json: data.json
      }
      return email
    });

    console.log('There are emails ', emails)

    const newLastVisible = emailsSnapshot.docs.length > 0 ? emailsSnapshot.docs[emailsSnapshot.docs.length - 1] : null;

    return { emails, lastVisible: newLastVisible, error: null }

  } catch (e) {
    // handleError(e)
    return { emails: [] as Email[], lastVisible: null, error: e }
  }
}

export async function getEmailById(emailId: string) {

  try {
    const emailDocRef = doc(db, 'emails', emailId);
    const emailDocSnap = await getDoc(emailDocRef);

    if (emailDocSnap.exists()) {
      const data = emailDocSnap.data();
      const email: Email = {
        id: emailDocSnap.id,
        name: data.name,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        description: data.description,
        content: data.content,
        json: data.json
      };

      console.log('Email found: ', email);
      return { email, error: null };
    } else {
      console.log('No such document!');
      return { email: null, error: 'No such document' };
    }
  } catch (e) {
    console.error('Error getting document: ', e);
    return { email: null, error: e };
  }
}

export async function createEmail(email: Partial<Email>) {

  let result: void | null | DocumentReference = null;

  try {
    const updatedAt = new Date();
    const createdAt = new Date();
    const emailData = { ...email, updatedAt, createdAt };
    result = await addDoc(collection(db, 'emails'), emailData);
    return { result, error: null };
  } catch (e) {
    handleError(e)
    return { result: null, error: e };
  }
}

export async function deleteEmail(emailId: string) {

  const emailDocRef = doc(db, 'emails', emailId);

  try {
    await deleteDoc(emailDocRef);
    // revalidatePath(path)
    return { success: true };
  } catch (e) {
    handleError(e)
    return [] as Email[];
  }
}

export async function updateEmail(emailId: string, emailData: Partial<Email>) {

  const emailDocRef = doc(db, 'emails', emailId);

  try {
    const emailSnapshot = await getDoc(emailDocRef);
    if (!emailSnapshot.exists()) {
      return { error: "Email not found." };
    }

    const updatedAt = new Date();
    const newData = { ...emailData, updatedAt };

    await updateDoc(emailDocRef, newData);
    return { success: true };
  } catch (e) {
    handleError(e)
    return [] as Email[];
  }
}

export async function getAllSubscribers(pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  const subscriptionsCollection = collection(db, 'newsletterSubscriptions');

  try {
    let subscriptionsQuery;
    if (lastVisible) {
      subscriptionsQuery = query(
        subscriptionsCollection,
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      subscriptionsQuery = query(
        subscriptionsCollection,
        orderBy('createdAt'),
        limit(pageSize)
      );
    }

    const subscriptionsSnapshot = await getDocs(subscriptionsQuery);

    const subscribers: NewsletterSubscription[] = subscriptionsSnapshot.docs.map(doc => {
      const data = doc.data();
      const subscription: NewsletterSubscription = {
        email: data.email,
        createdAt: data.createdAt.toDate(),
      };
      return subscription;
    });

    const newLastVisible = subscriptionsSnapshot.docs.length > 0 ? subscriptionsSnapshot.docs[subscriptionsSnapshot.docs.length - 1] : null;

    return { subscribers, lastVisible: newLastVisible, error: null };

  } catch (e) {
    // handleError(e)
    return { subscribers: [] as NewsletterSubscription[], lastVisible: null, error: e };
  }
}
