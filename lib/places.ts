// Google Places API utilities for The Village at Lake St. George

export interface PlaceDetails {
  // Basic Info
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  url?: string; // Google Maps URL
  vicinity?: string;
  editorial_summary?: string;
  
  // Ratings & Reviews
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
    relative_time_description: string;
  }>;
  
  // Business Status & Hours
  business_status?: string;
  opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  current_opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  secondary_opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  
  // Location & Visual
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    height: number;
    width: number;
    photo_reference: string;
  }>;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  types?: string[];
  icon?: string;
  icon_background_color?: string;
  
  // Restaurant/Food Features
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_lunch?: boolean;
  serves_dinner?: boolean;
  serves_beer?: boolean;
  serves_wine?: boolean;
  serves_vegetarian_food?: boolean;
  delivery?: boolean;
  takeout?: boolean;
  dine_in?: boolean;
  curbside_pickup?: boolean;
  
  // Accessibility
  wheelchair_accessible_entrance?: boolean;
  wheelchair_accessible_parking?: boolean;
  wheelchair_accessible_restroom?: boolean;
  wheelchair_accessible_seating?: boolean;
  
  // Payment & Amenities
  accepts_credit_cards?: boolean;
  accepts_debit_cards?: boolean;
  accepts_cash_only?: boolean;
  accepts_nfc?: boolean;
  outdoor_seating?: boolean;
  restroom?: boolean;
  good_for_children?: boolean;
  good_for_groups?: boolean;
  live_music?: boolean;
  good_for_watching_sports?: boolean;
}

// Known Place IDs for The Village at Lake St. George businesses
// Real Place IDs found via Google Places API
export const VILLAGE_PLACE_IDS = {
  // Real Place IDs for businesses at The Village at Lake St. George - Verified via Google Places API
  'dental-studio-palm-harbor': 'ChIJByKqF3HtwogRFBzu27qgABI', // Dental Studio of Palm Harbor - 3438 Tampa Rd
  'new-perspectives-body-care': 'ChIJ832rF3HtwogR96vnJOAzUyw', // New Perspectives Body Care - 3442 Tampa Rd
  'pupperazi-pet-spa': 'ChIJc29HP3HtwogRSVpv0fYESDg', // Pupperazi Pet Spa - 3454 Tampa Rd
  'faceless-samurai': 'ChIJ6dTNGXHtwogRACTPfyUtFU8', // Faceless Samurai - 3428 Tampa Rd
  
  // Additional businesses (keeping from previous search)
  'wax-pot-body-waxing': 'ChIJNVc7wJnzwogRsvlIDznATTU', // The Wax Pot Body Waxing - 3466 Tampa Rd
  'three-brothers-pizza': 'ChIJ9RC7iPPtwogR9JK_73-_8SU', // Three Brothers New York Pizza - 3436 Tampa Rd
  'charlie-coffee': 'ChIJ-ZFB15jtwogRpEcx2izoHr8', // Charlie Coffee - 3422 Tampa Rd
  'bjs-pub': 'ChIJMdVVFnHtwogRnK0Aije0tOE' // B J's Pub - 3440 Tampa Rd
};

// Fields we want to retrieve from Google Places API
const PLACE_FIELDS = [
  // Basic Info
  'place_id',
  'name',
  'formatted_address',
  'formatted_phone_number',
  'international_phone_number',
  'website',
  'url',
  'vicinity',
  
  // Ratings & Reviews
  'rating',
  'user_ratings_total',
  'price_level',
  'reviews',
  'editorial_summary',
  
  // Business Status & Hours
  'business_status',
  'opening_hours',
  'current_opening_hours',
  'secondary_opening_hours',
  
  // Location & Visual
  'geometry',
  'photos',
  'plus_code',
  'types',
  'icon',
  'icon_background_color',
  
  // Restaurant/Food Features
  'serves_breakfast',
  'serves_brunch',
  'serves_lunch',
  'serves_dinner',
  'serves_beer',
  'serves_wine',
  'serves_vegetarian_food',
  'delivery',
  'takeout',
  'dine_in',
  'curbside_pickup',
  
  // Accessibility
  'wheelchair_accessible_entrance',
  'wheelchair_accessible_parking',
  'wheelchair_accessible_restroom',
  'wheelchair_accessible_seating',
  
  // Payment & Amenities
  'accepts_credit_cards',
  'accepts_debit_cards',
  'accepts_cash_only',
  'accepts_nfc',
  'outdoor_seating',
  'restroom',
  'good_for_children',
  'good_for_groups',
  'live_music',
  'good_for_watching_sports'
].join(',');

/**
 * Fetch place details from Google Places API
 */
export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error('Google Places API key not found');
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${PLACE_FIELDS}&key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      return data.result as PlaceDetails;
    } else {
      console.error('Places API error:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

/**
 * Fetch all place details for Village businesses
 */
export async function fetchAllVillagePlaces(): Promise<Record<string, PlaceDetails | null>> {
  const results: Record<string, PlaceDetails | null> = {};
  
  for (const [businessId, placeId] of Object.entries(VILLAGE_PLACE_IDS)) {
    try {
      const details = await fetchPlaceDetails(placeId);
      results[businessId] = details;
    } catch (error) {
      console.error(`Error fetching details for ${businessId}:`, error);
      results[businessId] = null;
    }
  }
  
  return results;
}

/**
 * Convert Google Places opening hours to our format
 */
export function convertOpeningHours(openingHours?: PlaceDetails['opening_hours']) {
  if (!openingHours?.weekday_text) {
    return null;
  }

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const hours: Record<string, string> = {};

  openingHours.weekday_text.forEach((dayText, index) => {
    // Google returns Monday first (index 0), but our days array starts with Sunday
    const dayIndex = index === 6 ? 0 : index + 1;
    const dayKey = days[dayIndex];
    
    // Extract hours from text like "Monday: 9:00 AM – 5:00 PM"
    const match = dayText.match(/:\s*(.+)$/);
    hours[dayKey] = match ? match[1] : 'Closed';
  });

  return hours;
}

/**
 * Get a photo URL from Google Places photo reference
 */
export function getPlacePhotoUrl(photoReference: string, maxWidth = 400): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`;
}

/**
 * Format price level to display string
 */
export function formatPriceLevel(priceLevel?: number): string {
  if (priceLevel === undefined) return '';
  
  const levels = ['Free', '$', '$$', '$$$', '$$$$'];
  return levels[priceLevel] || '';
}

/**
 * Search for a place and get its Place ID
 * This is useful for finding Place IDs during development
 */
export async function searchPlaceId(query: string, location?: { lat: number; lng: number }): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.error('Google Places API key not found');
    return null;
  }

  try {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
    
    if (location) {
      url += `&location=${location.lat},${location.lng}&radius=1000`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].place_id;
    }
    
    return null;
  } catch (error) {
    console.error('Error searching for place:', error);
    return null;
  }
}
