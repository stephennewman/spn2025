import Link from 'next/link';
import { Business } from '@/lib/types';
import { isStale, getTodaysHours, isOpenNow, formatRelativeTime } from '@/lib/data';

interface BusinessCardProps {
  business: Business;
  onSelect?: (business: Business) => void;
}

export default function BusinessCard({ business, onSelect }: BusinessCardProps) {
  const todayHours = getTodaysHours(business.hours);
  const isOpen = isOpenNow(business.hours);
  const isStaleData = isStale(business.lastScrapedAt);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              <Link 
                href={`/business/${business.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {business.name}
              </Link>
            </h3>
            {business.category && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md">
                {business.category}
              </span>
            )}
          </div>
          
          {/* Status indicator */}
          <div className="flex flex-col items-end space-y-2">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              isOpen 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isOpen ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
              {isOpen ? 'Open' : 'Closed'}
            </div>
            
            {business.lastScrapedAt && (
              <div className={`text-xs px-2 py-1 rounded-lg ${
                isStaleData 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}>
                {isStaleData ? '⚠️ Needs update' : `✅ Updated ${formatRelativeTime(business.lastScrapedAt)}`}
              </div>
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
            <p className="text-sm text-gray-600">{business.address}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          {business.phone && (
            <a 
              href={`tel:${business.phone}`}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <div className="w-4 h-4 mr-2">
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
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <div className="w-4 h-4 mr-2">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              Visit Website
            </a>
          )}
        </div>

        {/* Today's Hours */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Today</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {todayHours || 'Hours not available'}
          </p>
        </div>

        {/* Promos */}
        {business.promos && business.promos.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Special Offers
            </h4>
            <div className="space-y-2">
              {business.promos.slice(0, 1).map((promo, index) => (
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
              {business.promos.length > 1 && (
                <p className="text-xs text-gray-500">
                  +{business.promos.length - 1} more offer{business.promos.length - 1 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
