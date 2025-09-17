'use client';

import { useState, useEffect } from 'react';
import { Business } from '@/lib/types';

interface SearchAndFiltersProps {
  businesses: Business[];
  onFilteredResults: (filtered: Business[]) => void;
}

type SortOption = 'name' | 'category' | 'rating' | 'updated';
type FilterState = {
  searchTerm: string;
  selectedCategories: string[];
  showOpenOnly: boolean;
  hasPhotos: boolean;
  minRating: number;
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
};

export default function SearchAndFilters({ businesses, onFilteredResults }: SearchAndFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategories: [],
    showOpenOnly: false,
    hasPhotos: false,
    minRating: 0,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from businesses
  const categories = [...new Set(businesses.map(b => b.category).filter(Boolean))];

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...businesses];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchLower) ||
        business.category?.toLowerCase().includes(searchLower) ||
        business.address.toLowerCase().includes(searchLower) ||
        business.phone?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(business =>
        business.category && filters.selectedCategories.includes(business.category)
      );
    }

    // Rating filter (placeholder - would need live data)
    if (filters.minRating > 0) {
      // This would work with Google Places data
      // filtered = filtered.filter(business => business.rating >= filters.minRating);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
        case 'updated':
          comparison = new Date(a.lastScrapedAt).getTime() - new Date(b.lastScrapedAt).getTime();
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    onFilteredResults(filtered);
  }, [businesses, filters, onFilteredResults]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedCategories: [],
      showOpenOnly: false,
      hasPhotos: false,
      minRating: 0,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = 
    (filters.searchTerm ? 1 : 0) +
    filters.selectedCategories.length +
    (filters.showOpenOnly ? 1 : 0) +
    (filters.hasPhotos ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Main Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search businesses, categories, or locations..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {filters.searchTerm && (
              <button
                onClick={() => updateFilter('searchTerm', '')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-48">
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [SortOption, 'asc' | 'desc'];
                setFilters(prev => ({ ...prev, sortBy, sortOrder }));
              }}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="category-asc">Category (A-Z)</option>
              <option value="category-desc">Category (Z-A)</option>
              <option value="updated-desc">Recently Updated</option>
              <option value="updated-asc">Oldest First</option>
            </select>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg font-medium transition-colors relative ${
              showFilters || activeFiltersCount > 0
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {category}
                      <span className="text-gray-400 ml-1">
                        ({businesses.filter(b => b.category === category).length})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOpenOnly}
                    onChange={(e) => updateFilter('showOpenOnly', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Open Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasPhotos}
                    onChange={(e) => updateFilter('hasPhotos', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has Photos</span>
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[0, 3, 4, 4.5].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="minRating"
                      value={rating}
                      checked={filters.minRating === rating}
                      onChange={(e) => updateFilter('minRating', Number(e.target.value))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {rating === 0 ? 'Any Rating' : (
                        <div className="flex items-center">
                          <span>{rating}+</span>
                          <span className="text-yellow-400 ml-1">⭐</span>
                        </div>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters ({activeFiltersCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}