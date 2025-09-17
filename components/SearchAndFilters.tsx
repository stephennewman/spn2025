'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, Business } from '@/lib/types';

interface SearchAndFiltersProps {
  businesses: Business[];
  onFiltersChange: (filters: SearchFilters) => void;
}

export default function SearchAndFilters({ businesses, onFiltersChange }: SearchAndFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    openNow: false,
    hasPromo: false
  });

  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query);
    }, 200);

    return () => clearTimeout(timer);
  }, [filters.query]);

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange({ ...filters, query: debouncedQuery });
  }, [debouncedQuery, filters.category, filters.openNow, filters.hasPromo, onFiltersChange]);

  const categories = Array.from(new Set(businesses
    .map(b => b.category)
    .filter(Boolean)
  )).sort();

  const handleInputChange = (field: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card p-8 mb-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
            🔍 Search Businesses
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or category..."
              value={filters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
            📂 Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Filters */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">⚡ Quick Filters</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                id="openNow"
                type="checkbox"
                checked={filters.openNow}
                onChange={(e) => handleInputChange('openNow', e.target.checked)}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                🟢 Open Now
              </span>
            </label>

            <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                id="hasPromo"
                type="checkbox"
                checked={filters.hasPromo}
                onChange={(e) => handleInputChange('hasPromo', e.target.checked)}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                🎉 Has Promo
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
