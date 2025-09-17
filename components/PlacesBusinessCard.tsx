'use client';

import { useState, useEffect } from 'react';
import { Business } from '@/lib/types';
import { PlaceDetails, getPlacePhotoUrl, formatPriceLevel, convertOpeningHours } from '@/lib/places';

interface PlacesBusinessCardProps {
  business: Business;
  placeId?: string;
}

export default function PlacesBusinessCard({ business, placeId }: PlacesBusinessCardProps) {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPlacesData, setShowPlacesData] = useState(false);

  useEffect(() => {
    if (placeId && showPlacesData) {
      fetchPlaceDetails();
    }
  }, [placeId, showPlacesData]);

  const fetchPlaceDetails = async () => {
    if (!placeId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/places?place_id=${placeId}`);
      const data = await response.json();

      if (response.ok && data.result) {
        setPlaceDetails(data.result);
      } else {
        setError(data.error || 'Failed to fetch place details');
      }
    } catch (err) {
      setError('Error fetching place details');
      console.error('Places API error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Use Places data if available and shown, otherwise use our static data
  const displayData = showPlacesData && placeDetails ? {
    name: placeDetails.name || business.name,
    address: placeDetails.formatted_address || business.address,
    phone: placeDetails.formatted_phone_number || business.phone,
    website: placeDetails.website || business.website,
    rating: placeDetails.rating,
    reviewCount: placeDetails.user_ratings_total,
    hours: convertOpeningHours(placeDetails.opening_hours) || business.hours,
    isOpen: placeDetails.opening_hours?.open_now,
    photos: placeDetails.photos,
    reviews: placeDetails.reviews?.slice(0, 2), // Show top 2 reviews
    priceLevel: placeDetails.price_level,
    businessStatus: placeDetails.business_status
  } : {
    name: business.name,
    address: business.address,
    phone: business.phone,
    website: business.website,
    hours: business.hours,
    promos: business.promos
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header with toggle */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {displayData.name}
          </h3>
          {business.category && (
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
              {business.category}
            </span>
          )}
        </div>
        
        {placeId && (
          <div className="ml-4">
            <button
              onClick={() => setShowPlacesData(!showPlacesData)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                showPlacesData 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showPlacesData ? 'Live Data' : 'Show Live Data'}
            </button>
          </div>
        )}
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading live data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Rating (Places data only) */}
      {showPlacesData && placeDetails && displayData.rating && (
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="ml-1 font-semibold text-gray-900">{displayData.rating}</span>
            {displayData.reviewCount && (
              <span className="ml-1 text-sm text-gray-600">
                ({displayData.reviewCount} reviews)
              </span>
            )}
          </div>
          {displayData.priceLevel !== undefined && (
            <span className="ml-4 text-sm font-medium text-gray-700">
              {formatPriceLevel(displayData.priceLevel)}
            </span>
          )}
        </div>
      )}

      {/* Business Status (Places data only) */}
      {showPlacesData && placeDetails && displayData.businessStatus && (
        <div className="mb-4">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
            displayData.businessStatus === 'OPERATIONAL' 
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {displayData.businessStatus === 'OPERATIONAL' ? '✅ Open' : '❌ Closed'}
            {displayData.isOpen !== undefined && displayData.businessStatus === 'OPERATIONAL' && (
              <span className="ml-1">
                {displayData.isOpen ? '(Open Now)' : '(Closed Now)'}
              </span>
            )}
          </span>
        </div>
      )}

      {/* Address */}
      {displayData.address && (
        <div className="flex items-start mb-4">
          <div className="w-5 h-5 text-gray-400 mr-3 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-600">{displayData.address}</p>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-2 mb-6">
        {displayData.phone && (
          <a 
            href={`tel:${displayData.phone}`}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <div className="w-5 h-5 mr-3">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            {displayData.phone}
          </a>
        )}
        {displayData.website && (
          <a 
            href={displayData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <div className="w-5 h-5 mr-3">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            Visit Website
          </a>
        )}
      </div>

      {/* Photos (Places data only) */}
      {showPlacesData && placeDetails && displayData.photos && displayData.photos.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Photos</h4>
          <div className="flex space-x-3 overflow-x-auto">
            {displayData.photos.slice(0, 3).map((photo, index) => (
              <img
                key={index}
                src={getPlacePhotoUrl(photo.photo_reference, 200)}
                alt={`${displayData.name} photo ${index + 1}`}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Hours */}
      {displayData.hours && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Hours</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
            {Object.entries(displayData.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize text-gray-600">{day}:</span>
                <span className="text-gray-900">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews (Places data only) */}
      {showPlacesData && placeDetails && displayData.reviews && displayData.reviews.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Reviews</h4>
          <div className="space-y-3">
            {displayData.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">{review.author_name}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{review.text}</p>
                <p className="text-xs text-gray-500 mt-1">{review.relative_time_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promotions (Static data only) */}
      {!showPlacesData && (displayData as any).promos && (displayData as any).promos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Offers</h4>
          <div className="space-y-2">
            {(displayData as any).promos.map((promo: any, index: number) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <span className="text-sm text-blue-800">
                  {promo.url ? (
                    <a 
                      href={promo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline font-medium"
                    >
                      {promo.label}
                    </a>
                  ) : (
                    promo.label
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
