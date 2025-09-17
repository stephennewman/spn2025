'use client';

import { useEffect, useRef } from 'react';
import { Business } from '@/lib/types';

interface SimpleWorkingMapProps {
  businesses: Business[];
}

export default function SimpleWorkingMap({ businesses }: SimpleWorkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      // Create map centered on Pupperazi Pet Spa
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: 28.0535, lng: -82.7251 }, // Pupperazi Pet Spa - 3454 Tampa Rd, Palm Harbor, FL 34684
        zoom: 18,
        mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
      });

      // Add markers for businesses around Pupperazi Pet Spa
      businesses.forEach((business, index) => {
        const angle = (index * 2 * Math.PI) / businesses.length;
        const radius = 0.0003;
        const position = {
          lat: 28.0535 + Math.cos(angle) * radius,
          lng: -82.7251 + Math.sin(angle) * radius,
        };

        new (window as any).google.maps.Marker({
          position,
          map,
          title: business.name,
        });
      });

      console.log('Map initialized with', businesses.length, 'markers');
    };

    // Load Google Maps if not already loaded
    if ((window as any).google && (window as any).google.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
      };

      // Only add script if it doesn't exist
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        document.head.appendChild(script);
      }
    }
  }, [businesses]);

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
          className="w-full h-96 md:h-[500px] rounded-xl bg-gray-200"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
}
