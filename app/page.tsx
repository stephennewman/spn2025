'use client';

import { useState, useEffect } from 'react';
import { Plaza, Business } from '@/lib/types';
import { getPlaza } from '@/lib/data';

export default function DirectoryPage() {
  const [plaza, setPlaza] = useState<Plaza | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load plaza data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const plazaData = await getPlaza();
        setPlaza(plazaData);
        setBusinesses(plazaData.businesses || []);
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
        <div className="text-sm text-gray-500">
          <span className="font-medium text-blue-600">
            {businesses.length} business{businesses.length !== 1 ? 'es' : ''} available
          </span>
        </div>
      </div>

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
            {businesses.map((business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Business Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h3>
                    {business.category && (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                        {business.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                {business.address && (
                  <div className="flex items-start mb-4">
                    <div className="w-5 h-5 text-gray-400 mr-3 mt-0.5">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">{business.address}</p>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-2 mb-6">
                  {business.phone && (
                    <a 
                      href={`tel:${business.phone}`}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <div className="w-5 h-5 mr-3">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      {business.phone}
                    </a>
                  )}
                  {business.website && (
                    <a 
                      href={business.website}
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

                {/* Hours */}
                {business.hours && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Hours</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-gray-600">{day}:</span>
                          <span className="text-gray-900">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promotions */}
                {business.promos && business.promos.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Offers</h4>
                    <div className="space-y-2">
                      {business.promos.map((promo, index) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}