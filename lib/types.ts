import { Timestamp } from 'firebase/firestore';
import { DateRange } from 'react-day-picker';
import * as z from 'zod';

// Enums
enum Role {
  AGENCY_OWNER = 'AGENCY_OWNER',
  AGENCY_ADMIN = 'AGENCY_ADMIN',
  SUBACCOUNT_USER = 'SUBACCOUNT_USER',
  SUBACCOUNT_GUEST = 'SUBACCOUNT_GUEST',
}

export enum Period {
  AM = 'AM',
  PM = 'PM',
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
  website: string;
  description: string
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
  center: [ number, number ];
  zoom: number;
}

export interface EventTime {
  hours: number
  minutes: number
  period: Period
}

export interface EventLinks {
  website: string
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}


export interface Event {
  id: string;
  organizationId: string;
  name: string;
  banner: string;
  category: string;
  price: string
  isFree: boolean
  date: DateRange;
  time: EventTime; 
  venue: EventAddress;
  description: string;
  slug: string;
  links: EventLinks
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Email {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  content: string
  json: string
}

export interface EmailTemplate {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  content?: string;
  previewImage?: string;
}

export interface Notification {
  id?: string;
  notification: string;
  agencyId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface LGA {
  name: string;
  latitude: number;
  longitude: number;
}

export interface EventOptions {when?: string, where?: string, category?: string, price?: string}

export interface SearchOptions {
  searchTerm?: string;
  category?: string;
  venue?: string;
  date?: string;
  price?: string;
}

export interface SearchParameters {
  query?: string;
  category?: string;
  price?: string;
  venue?: string;
  date?: string;
}

export interface DraggableItem {
  type: 'container' | 'column' | 'custom-block' | 'custom-element';
}

export interface ElementComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'link' | 'divider' | 'video' | 'html' | 'heading' | 'timer';
  styles: { [key: string]: any };  // All CSS properties are customizable
  content: string;  // Optional, depending on the element type
}
export interface BlockComponent {
  id: string;
  type: string;
  styles: { [key: string]: any };  // All CSS properties are customizable
  content: Array<ElementComponent | BlockComponent>;  // Can contain both element and block components
}
export interface CustomComponent {
  id: string;
  type: string;
  name?: string;
  description?: string;
  code: string;  // React or HTML code for the custom component
  config: { [key: string]: any };  // Configuration object for editable properties
}

export interface NewsletterSubscription {
  email: string;
  createdAt: Date;
}

export const FormSchema = z.object({
  name: z.string().min(3, { message: 'Event Name cannot be less than 3 characters.' }),
  category: z.string().min(4, { message: 'Category is required.' }),
  price: z.string().min(0, { message: 'Price is required.' }),
  banner: z.string().min(1, { message: 'Event Banner is required.' }),
  description: z.string().min(10, { message: 'Event Description cannot be less than 10 characters.' }),
  date: z.object({
    from: z.date({ invalid_type_error: 'Invalid start date' }),
    to: z.date({ invalid_type_error: 'Invalid end date' })
  }).refine(data => data.to >= data.from, {
    message: 'End date must be after start date',
    path: ['to'],
  }),
  time: z.object({
    hours: z.number().int().min(1).max(12, { message: 'Hours must be between 1 and 12' }),
    minutes: z.number().int().min(0).max(59, { message: 'Minutes must be between 0 and 59' }),
    period: z.enum([Period.AM, Period.PM], { message: 'Period must be either AM or PM' }),
  }),
  state: z.string().min(1, { message: 'State is required.' }),
  region: z.string().min(1, { message: 'Region is required.' }),
  street: z.string().min(1, { message: 'Street is required.' }),
  website: z.string().url({ message: 'Invalid website URL' }),
  linkedin: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
});