'use client';

interface ResultsCounterProps {
  totalResults: number;
  filteredResults: number;
  searchTerm?: string;
  hasActiveFilters: boolean;
}

export default function ResultsCounter({ 
  totalResults, 
  filteredResults, 
  searchTerm,
  hasActiveFilters 
}: ResultsCounterProps) {
  if (totalResults === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📍</div>
        <p className="text-gray-600">No businesses found</p>
      </div>
    );
  }

  if (filteredResults === 0 && (searchTerm || hasActiveFilters)) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">🔍</div>
        <p className="text-gray-600 mb-2">
          No businesses match your {searchTerm ? 'search' : 'filters'}
        </p>
        {searchTerm && (
          <p className="text-sm text-gray-500">
            Try searching for "{searchTerm}" with different terms
          </p>
        )}
      </div>
    );
  }

  const showingAll = filteredResults === totalResults;
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          {showingAll ? (
            <>
              Showing <span className="font-semibold text-gray-900">{totalResults}</span> business{totalResults !== 1 ? 'es' : ''}
            </>
          ) : (
            <>
              Showing <span className="font-semibold text-gray-900">{filteredResults}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalResults}</span> business{totalResults !== 1 ? 'es' : ''}
            </>
          )}
        </p>
        
        {searchTerm && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">for</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              "{searchTerm}"
            </span>
          </div>
        )}
      </div>

      {!showingAll && (
        <div className="text-xs text-gray-500">
          {Math.round((filteredResults / totalResults) * 100)}% of results
        </div>
      )}
    </div>
  );
}
