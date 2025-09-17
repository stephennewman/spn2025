import Link from 'next/link';
import { Business } from '@/lib/types';
import { isStale, getTodaysHours, isOpenNow, formatRelativeTime } from '@/lib/data';

interface BusinessTableProps {
  businesses: Business[];
}

export default function BusinessTable({ businesses }: BusinessTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Today&apos;s Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promos
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businesses.map((business) => {
              const todayHours = getTodaysHours(business.hours);
              const isOpen = isOpenNow(business.hours);
              const isStaleData = isStale(business.lastScrapedAt);

              return (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <Link 
                          href={`/business/${business.id}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          {business.name}
                        </Link>
                        {business.lastScrapedAt && (
                          <div className={`text-xs mt-1 ${
                            isStaleData ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {isStaleData ? 'Needs update' : `Updated ${formatRelativeTime(business.lastScrapedAt)}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.category ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        {business.category}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {business.address || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.phone ? (
                      <a 
                        href={`tel:${business.phone}`}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        {business.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {isOpen ? 'Open' : 'Closed'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {todayHours || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.promos && business.promos.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {business.promos.slice(0, 2).map((promo, index) => (
                          <span 
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded"
                          >
                            {promo.label}
                          </span>
                        ))}
                        {business.promos.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{business.promos.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
