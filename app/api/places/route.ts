import { NextRequest, NextResponse } from 'next/server';
import { fetchAllVillagePlaces, fetchPlaceDetails } from '@/lib/places';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');

  try {
    if (placeId) {
      // Fetch details for a specific place
      const details = await fetchPlaceDetails(placeId);
      
      if (!details) {
        return NextResponse.json(
          { error: 'Place not found or API error' },
          { status: 404 }
        );
      }

      return NextResponse.json({ result: details });
    } else {
      // Fetch all Village places
      const allPlaces = await fetchAllVillagePlaces();
      
      return NextResponse.json({ 
        results: allPlaces,
        count: Object.keys(allPlaces).length 
      });
    }
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, location } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // This would be used to search for new places and get their Place IDs
    // For now, we'll return a placeholder response
    return NextResponse.json({
      message: 'Place search functionality - to be implemented',
      query,
      location
    });
  } catch (error) {
    console.error('Places search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
