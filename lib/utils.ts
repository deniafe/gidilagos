import { type ClassValue, clsx } from "clsx"
import { Timestamp } from "firebase/firestore"
import { twMerge } from "tailwind-merge"
import { SearchParameters } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const truncateString = (str: string, len = 12): string => {
  if (str.length <= len) {
    return str;
  } else {
    return str.substring(0, len) + '...';
  }
};

export const createSlug = (sentence: string): string => {
  let slug = sentence.toLowerCase().trim();
  slug = slug.replace(/[^a-z0-9]+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
};

export function buildSearchURL(searchParams: SearchParameters): string {
  const queryParams = new URLSearchParams();

  if (searchParams.query) {
    queryParams.append('query', searchParams.query);
  }

  if (searchParams.category) {
    console.log('Building the categories for you inside of funccccccccccccccccccccccccccccccccc', searchParams.category)
    queryParams.append('category', searchParams.category);
  }

  if (searchParams.price) {
    queryParams.append('price', searchParams.price.toString());
  }

  if (searchParams.venue) {
    queryParams.append('venue', searchParams.venue);
  }

  if (searchParams.date) {
    queryParams.append('date', searchParams.date);
  }

  return `/search?${queryParams.toString()}`;
}

export function getDateRange(dateString: string): [string, string] {
  const today = new Date();
  const beginningDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  switch (dateString) {
    case 'Today':
      break;
    case 'This Week':
      endDate.setDate(today.getDate() + (7 - today.getDay())); // Set to the end of the week (Saturday)
      break;
    case 'This Weekend':
      endDate.setDate(today.getDate() + (7 - today.getDay())); // Set to the end of the week (Saturday)
      beginningDate.setDate(today.getDate() + (5 - today.getDay())); // Set to the beginning of the weekend (Friday)
      break;
    case 'Next Week':
      beginningDate.setDate(today.getDate() + (7 - today.getDay())); // Set to the beginning of next week (Sunday)
      endDate.setDate(today.getDate() + (13 - today.getDay())); // Set to the end of next week (Saturday)
      break;
    case 'This Month': 
      endDate.setMonth(today.getMonth() + 1, 0); // Set to the end of the current month
      break;
    case 'Next Month':
      beginningDate.setMonth(today.getMonth() + 1, 1); // Set to the beginning of next month
      endDate.setMonth(today.getMonth() + 2, 0); // Set to the end of next month
      break;
    case 'Beyond':
      beginningDate.setDate(today.getDate() + 1);
      endDate.setFullYear(today.getFullYear() + 100); // Adjust as needed
      break;
    default:
      break;
  }

  const dd = String(beginningDate.getDate()).padStart(2, '0');
  const mm = String(beginningDate.getMonth() + 1).padStart(2, '0');
  const yy = String(beginningDate.getFullYear());
  const beginningDateString = `${dd}/${mm}/${yy}`;

  if (dateString === 'Today' || dateString === 'Beyond') {
    return [beginningDateString, ''];
  }

  endDate.setDate(endDate.getDate() - 1);
  const endDd = String(endDate.getDate()).padStart(2, '0');
  const endMm = String(endDate.getMonth() + 1).padStart(2, '0');
  const endYy = String(endDate.getFullYear());
  const endDateString = `${endDd}/${endMm}/${endYy}`;

  return [beginningDateString, endDateString];
}

export function formatDate(timestampOrDate: Timestamp | Date): string {
  // Convert Timestamp to Date if necessary
  const dateObject = timestampOrDate instanceof Timestamp 
    ? timestampOrDate.toDate() 
    : timestampOrDate;

  const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${day} ${month} ${year}`;
}

export function convertToTimestamp(dateString: string): Timestamp | null {
  const [day, month, year] = dateString.split('/').map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  const jsDate = new Date(year, month - 1, day); // Months are zero-indexed
  const timestamp = Timestamp.fromDate(jsDate);
  return timestamp;
}

// Example usage
const dateRanges = ['Today', 'This Week', 'This Weekend', 'Next Week', 'This Month', 'Next Month', 'Beyond'];

// dateRanges.forEach(dateRange => {
//   const [beginningDate, endDate] = getDateRange(dateRange);
//   if (endDate) {
//     console.log(`${dateRange}: ${beginningDate} - ${endDate}`);
//   } else {
//     console.log(`${dateRange}: ${beginningDate}`);
//   }
// });