import { Plaza, Business, HoursByDay } from './types';

// Check if a timestamp is stale (older than specified hours)
export function isStale(iso?: string, hours = 48): boolean {
  if (!iso) return true;
  const timestamp = new Date(iso);
  const now = new Date();
  const diffHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
  return diffHours > hours;
}

// Get today's hours for a business
export function getTodaysHours(hours?: HoursByDay, now = new Date()): string | null {
  if (!hours) return null;
  
  const dayMap: Record<number, keyof HoursByDay> = {
    0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'
  };
  
  const today = dayMap[now.getDay()];
  return hours[today] || null;
}

// Check if business is open now
export function isOpenNow(hours?: HoursByDay, now = new Date(), tz = "America/New_York"): boolean {
  if (!hours) return false;
  
  const dayMap: Record<number, keyof HoursByDay> = {
    0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat'
  };
  
  const today = dayMap[now.getDay()];
  const todayHours = hours[today];
  
  if (!todayHours || todayHours.toLowerCase().includes('closed')) {
    return false;
  }
  
  // Parse time ranges like "8 AM–5:30 PM" or "11:30 AM–2:30 PM, 5–9 PM"
  const timeRanges = todayHours.split(',').map(range => range.trim());
  
  for (const range of timeRanges) {
    if (isTimeInRange(now, range)) {
      return true;
    }
  }
  
  return false;
}

// Helper function to check if current time is within a time range
function isTimeInRange(now: Date, timeRange: string): boolean {
  const timePattern = /(\d{1,2}):?(\d{2})?\s*(AM|PM)?\s*[–-]\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i;
  const match = timeRange.match(timePattern);
  
  if (!match) return false;
  
  const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const startTime = parseTime(parseInt(startHour), parseInt(startMin || '0'), startPeriod);
  const endTime = parseTime(parseInt(endHour), parseInt(endMin || '0'), endPeriod);
  
  return currentTime >= startTime && currentTime <= endTime;
}

// Helper function to parse time to minutes since midnight
function parseTime(hour: number, minute: number, period?: string): number {
  if (period?.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period?.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }
  return hour * 60 + minute;
}

// Get plaza data (supports both single file and multi-file modes)
export async function getPlaza(): Promise<Plaza> {
  const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
  
  try {
    // Try single file mode first
    const response = await fetch(`${baseUrl}/data/plaza.json`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Single file mode not found, trying multi-file mode');
  }
  
  // Multi-file mode
  const indexResponse = await fetch(`${baseUrl}/data/index.json`);
  if (!indexResponse.ok) {
    throw new Error('No plaza data found');
  }
  
  const indexData = await indexResponse.json();
  const businesses: Business[] = [];
  
  for (const businessFile of indexData.businessFiles || []) {
    try {
      const businessResponse = await fetch(`${baseUrl}/data/businesses/${businessFile}`);
      if (businessResponse.ok) {
        const business = await businessResponse.json();
        businesses.push(business);
      }
    } catch (error) {
      console.error(`Failed to load business file: ${businessFile}`, error);
    }
  }
  
  return {
    ...indexData,
    businesses
  };
}

// Get all businesses
export async function getBusinesses(): Promise<Business[]> {
  const plaza = await getPlaza();
  return plaza.businesses || [];
}

// Get business by ID
export async function getBusinessById(id: string): Promise<Business | null> {
  const businesses = await getBusinesses();
  return businesses.find(business => business.id === id) || null;
}

// Format relative time
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes}m ago`;
  }
}

// Filter businesses based on search criteria
export function filterBusinesses(businesses: Business[], filters: {
  query: string;
  category: string;
  openNow: boolean;
  hasPromo: boolean;
}): Business[] {
  return businesses.filter(business => {
    // Search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesName = business.name.toLowerCase().includes(query);
      const matchesCategory = business.category?.toLowerCase().includes(query) || false;
      if (!matchesName && !matchesCategory) return false;
    }
    
    // Category filter
    if (filters.category && business.category !== filters.category) {
      return false;
    }
    
    // Open now filter
    if (filters.openNow && !isOpenNow(business.hours)) {
      return false;
    }
    
    // Has promo filter
    if (filters.hasPromo && (!business.promos || business.promos.length === 0)) {
      return false;
    }
    
    return true;
  });
}

// Get unique categories from businesses
export function getCategories(businesses: Business[]): string[] {
  const categories = businesses
    .map(business => business.category)
    .filter((category): category is string => Boolean(category));
  
  return Array.from(new Set(categories)).sort();
}
