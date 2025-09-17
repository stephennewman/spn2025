'use client';

import { useEffect, useRef, useState } from 'react';
import { Business } from '@/lib/types';
import { loadGoogleMaps, isGoogleMapsReady } from '@/lib/googleMaps';

interface CleanMapProps {
  businesses: Business[];
}

export default function CleanMap({ businesses }: CleanMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const initMap = () => {
      if (!isMounted) {
        console.log('Component unmounted, skipping map init');
        return;
      }

      if (!mapRef.current) {
        console.log('Map container not found');
        setStatus('error');
        return;
      }

      if (!(window as any).google) {
        console.log('Google Maps not loaded');
        setStatus('error');
        return;
      }

      try {
        console.log('Creating Google Map...');
        const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: 28.0532, lng: -82.7251 }, // 3414 Tampa Rd, Palm Harbor, FL 34684
          zoom: 18,
          mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
        });

        console.log('Map created successfully, adding markers...');
        setMap(mapInstance);

        // Add markers around 3414 Tampa Rd
        businesses.forEach((business, index) => {
          const angle = (index * 2 * Math.PI) / businesses.length;
          const radius = 0.0003; // Small radius for plaza layout
          const position = {
            lat: 28.0532 + Math.cos(angle) * radius,
            lng: -82.7251 + Math.sin(angle) * radius,
          };

          new (window as any).google.maps.Marker({
            position,
            map: mapInstance,
            title: business.name,
          });
        });

        console.log(`Added ${businesses.length} markers`);
        setStatus('loaded');
        console.log('Map fully loaded!');
      } catch (error) {
        console.error('Map initialization error:', error);
        setStatus('error');
      }
    };

    const loadAndInitMap = async () => {
      try {
        console.log('Loading Google Maps...');
        await loadGoogleMaps();
        console.log('Google Maps loaded successfully');
        
        if (isMounted) {
          initMap();
        }
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    // Set timeout for loading
    timeoutId = setTimeout(() => {
      if (isMounted && status === 'loading') {
        console.log('Map loading timeout');
        setStatus('error');
      }
    }, 10000);

    loadAndInitMap();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [businesses]);

  if (status === 'loading') {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Explore The Village
          </h2>
          <p className="text-gray-600">
            Loading interactive map...
          </p>
        </div>
        
        <div className="card p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Explore The Village
          </h2>
          <p className="text-gray-600">
            Map temporarily unavailable. View our businesses below.
          </p>
        </div>
        
        <div className="card p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Map View</h3>
            <p className="text-gray-600 mb-6">
              Interactive map is temporarily unavailable. Please use the business listings below to explore our plaza.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businesses.slice(0, 4).map((business) => (
                <div key={business.id} className="p-4 bg-gray-50 rounded-lg text-left">
                  <h4 className="font-semibold text-gray-900">{business.name}</h4>
                  <p className="text-sm text-gray-600">{business.category}</p>
                  {business.address && (
                    <p className="text-xs text-gray-500 mt-1">{business.address}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">
          Explore The Village
        </h2>
        <p className="text-gray-600">
          Interactive map of The Village at Lake St. George
        </p>
      </div>
      
      <div className="card overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-96 md:h-[500px] rounded-xl"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
}
