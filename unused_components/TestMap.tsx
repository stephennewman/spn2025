'use client';

import { useEffect, useRef, useState } from 'react';
import { Business } from '@/lib/types';

interface TestMapProps {
  businesses: Business[];
}

export default function TestMap({ businesses }: TestMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (message: string) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    let isMounted = true;

    const initMap = () => {
      if (!isMounted || !mapRef.current || !window.google) {
        addDebug('Map initialization failed - missing requirements');
        return;
      }

      try {
        addDebug('Starting map initialization...');
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: 28.0844, lng: -82.7631 },
          zoom: 18,
          mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
        });

        addDebug('Map created successfully');

        // Add markers
        businesses.forEach((business, index) => {
          const angle = (index * 2 * Math.PI) / businesses.length;
          const radius = 0.0003;
          const position = {
            lat: 28.0844 + Math.cos(angle) * radius,
            lng: -82.7631 + Math.sin(angle) * radius,
          };

          new (window as any).google.maps.Marker({
            position,
            map,
            title: business.name,
          });
        });

        addDebug(`Added ${businesses.length} markers`);

        if (isMounted) {
          setStatus('loaded');
          addDebug('Map fully loaded and ready');
        }
      } catch (error) {
        addDebug(`Map initialization error: ${error}`);
        console.error('Map initialization error:', error);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    const loadGoogleMaps = () => {
      if (window.google) {
        addDebug('Google Maps already available');
        initMap();
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      addDebug(`API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => {
        addDebug('Google Maps script loaded successfully');
        if (isMounted) {
          setTimeout(initMap, 100);
        }
      };
      script.onerror = (error) => {
        addDebug(`Script load error: ${error}`);
        console.error('Failed to load Google Maps:', error);
        if (isMounted) {
          setStatus('error');
        }
      };
      document.head.appendChild(script);
      addDebug('Script tag added to document head');
    };

    // Set timeout
    const timeout = setTimeout(() => {
      if (isMounted && status === 'loading') {
        addDebug('Timeout reached - switching to error state');
        setStatus('error');
      }
    }, 5000);

    addDebug('Starting map load process');
    loadGoogleMaps();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [businesses, status]);

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
            <p className="text-gray-600 mb-4">Loading map...</p>
            <div className="text-left text-sm text-gray-500 max-h-32 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="mb-1">{info}</div>
              ))}
            </div>
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
            <div className="text-left text-sm text-gray-500 mb-6 max-h-32 overflow-y-auto">
              <strong>Debug Info:</strong>
              {debugInfo.map((info, index) => (
                <div key={index} className="mb-1">{info}</div>
              ))}
            </div>
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
