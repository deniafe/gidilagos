import { Timestamp } from 'firebase/firestore';

// Enums
enum Role {
  AGENCY_OWNER = 'AGENCY_OWNER',
  AGENCY_ADMIN = 'AGENCY_ADMIN',
  SUBACCOUNT_USER = 'SUBACCOUNT_USER',
  SUBACCOUNT_GUEST = 'SUBACCOUNT_GUEST',
}

export interface User {
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
}

export interface Organization {
  id?: string;
  userId: string;
  name: string;
  logo: string;
  organizationEmail: string;
  organizationPhone: string;
  website?: string;
  description?: string
  address: string;
  city: string;
  zipCode: string;
  state: string;
}

export interface EventDate {
  startDate: Timestamp;
  endDate: Timestamp;
  key: string;
}

export interface EventAddress {
  state: string;
  region: string;
  street: string;
  center: { lat: number; lng: number };
  zoom: number;
}


export interface Event {
  id?: string;
  organizationId: string;
  name: string;
  banner: string;
  category: string;
  price: string
  isFree: boolean
  date: EventDate;
  time: string; 
  website: string
  venue: EventAddress;
  description: string;
  slug: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: string;
  type?: string;
  name: string;
  link: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Email {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string | null;
  userIdId: string;
}

export interface EmailTemplate {
  id?: string;
  name: string;
  pathName: string;
  createdAt: Date;
  updatedAt: Date;
  visits: number;
  content?: string | null;
  order: number;
  previewImage?: string | null;
  emailId: string;
}

export interface Notification {
  id?: string;
  notification: string;
  agencyId: string;
  createdAt: Date;
  updatedAt: Date;
}