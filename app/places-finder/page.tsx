'use client';

import { useState } from 'react';

interface SearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
}

export default function PlacesFinderPage() {
  const [apiKey, setApiKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = async () => {
    if (!apiKey || !searchQuery) {
      setError('Please provide both API key and search query');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Tampa Road, Palm Harbor, FL location for local search
      const location = '28.0532,-82.7251';
      const radius = '2000'; // 2km radius
      
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&location=${location}&radius=${radius}&key=${apiKey}`;
      
      const response = await fetch(`/api/proxy-places?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.status === 'OK') {
        setResults(data.results.slice(0, 10)); // Show top 10 results
      } else {
        setError(`API Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }
    } catch (err) {
      setError(`Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const predefinedSearches = [
    'New Perspectives Body Care Pilates Studio Tampa Road Palm Harbor',
    'Dental Studio Palm Harbor Tampa Road',
    'Pupperazi Pet Spa Tampa Road Palm Harbor',
    'Faceless Samurai restaurant Tampa Road Palm Harbor',
    'businesses Tampa Road Palm Harbor FL'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Google Places ID Finder
        </h1>
        <p className="text-gray-600">
          Find Google Place IDs for businesses at The Village at Lake St. George
        </p>
      </div>

      {/* API Key Input */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">
          ⚠️ Development Tool
        </h2>
        <p className="text-yellow-700 text-sm mb-4">
          This is a development tool to find Place IDs. Enter your Google Places API key temporarily to search for businesses.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Places API Key (temporary)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your API key..."
            />
          </div>
        </div>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Query
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business name and location..."
            />
          </div>
          
          <button
            onClick={searchPlaces}
            disabled={loading || !apiKey || !searchQuery}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search Places'}
          </button>
        </div>

        {/* Predefined Searches */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Searches:</h3>
          <div className="space-y-2">
            {predefinedSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
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
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Search Results ({results.length})
          </h2>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.place_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {result.name}
                  </h3>
                  {result.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600">
                        {result.rating} ({result.user_ratings_total} reviews)
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">{result.formatted_address}</p>
                
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Place ID:</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.place_id)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <code className="text-xs text-gray-800 break-all">
                    {result.place_id}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">
          How to Use This Tool
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Get a Google Places API key from Google Cloud Console</li>
          <li>Enable the Places API for your project</li>
          <li>Enter the API key above (it&apos;s only used locally)</li>
          <li>Search for businesses using the predefined queries or create your own</li>
          <li>Copy the Place IDs from the results</li>
          <li>Add the Place IDs to the VILLAGE_PLACE_IDS constant in lib/places.ts</li>
        </ol>
      </div>
    </div>
  );
}
