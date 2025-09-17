'use client';

import { useState, useEffect } from 'react';
import { Plaza, Business } from '@/lib/types';
import { getPlaza } from '@/lib/data';
import { VILLAGE_PLACE_IDS } from '@/lib/places';
import PlacesBusinessCard from '@/components/PlacesBusinessCard';

export default function DirectoryPage() {
  const [plaza, setPlaza] = useState<Plaza | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Load plaza data and check API key
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const plazaData = await getPlaza();
        setPlaza(plazaData);
        setBusinesses(plazaData.businesses || []);
        
        // Check if Google Places API key is available
        setHasApiKey(!!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);
      } catch (err) {
        setError('Failed to load plaza data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading directory...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-6">
          <span className="text-white font-bold text-xl">V</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {plaza?.plazaName || 'The Village at Lake St. George'}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your local business directory in Palm Harbor, Florida
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <span className="font-medium text-blue-600">
            {businesses.length} business{businesses.length !== 1 ? 'es' : ''} available
          </span>
          <span className="hidden sm:block">•</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className={hasApiKey ? 'text-green-600' : 'text-gray-500'}>
              {hasApiKey ? 'Live Google Places data available' : 'Static data only'}
            </span>
          </div>
        </div>
      </div>

      {/* API Key Setup Banner */}
      {!hasApiKey && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-800">Enable Live Google Places Data</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p className="mb-2">
                  Add your Google Places API key to see live data including real-time hours, reviews, ratings, and photos.
                </p>
                <p className="font-medium">
                  Create a <code className="bg-blue-100 px-1 rounded">.env.local</code> file with:
                </p>
                <code className="block bg-blue-100 p-2 rounded mt-1 text-xs">
                  NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here
                </code>
                <p className="mt-2">
                  <a 
                    href="https://console.cloud.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Get your API key from Google Cloud Console →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 text-blue-600 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 font-medium">3430 Tampa Road</p>
            <p className="text-gray-500">Palm Harbor, FL 34684</p>
          </div>
        </div>
      </div>

      {/* Business List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Businesses</h2>
        
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No businesses found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {businesses.map((business) => {
              // Map business IDs to Place IDs
              const placeId = VILLAGE_PLACE_IDS[business.id as keyof typeof VILLAGE_PLACE_IDS];
              
              return (
                <PlacesBusinessCard
                  key={business.id}
                  business={business}
                  placeId={placeId}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}