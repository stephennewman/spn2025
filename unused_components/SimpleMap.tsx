'use client';

import { useEffect, useRef, useState } from 'react';
import { Business } from '@/lib/types';

interface SimpleMapProps {
  businesses: Business[];
}

export default function SimpleMap({ businesses }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadMap = () => {
      if (!mapRef.current || mapLoaded) return;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        if ((window as any).google && mapRef.current) {
          const map = new (window as any).google.maps.Map(mapRef.current, {
            center: { lat: 28.0844, lng: -82.7631 },
            zoom: 18,
          });

          // Add markers for each business
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

          setMapLoaded(true);
        }
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadMap();
  }, [businesses, mapLoaded]);

  if (!mapLoaded) {
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
