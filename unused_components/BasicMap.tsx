'use client';

import { useEffect, useRef, useState } from 'react';

export default function BasicMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const loadMap = () => {
      setStatus('Checking map container...');
      
      if (!mapRef.current) {
        setStatus('ERROR: Map container not found');
        return;
      }
      
      setStatus('Map container found. Checking Google Maps...');
      
      if (!(window as any).google || !(window as any).google.maps) {
        setStatus('ERROR: Google Maps not loaded');
        return;
      }
      
      setStatus('Google Maps found. Creating map...');
      
      try {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: 28.0535, lng: -82.7251 }, // Pupperazi Pet Spa location
          zoom: 18,
        });
        
        new (window as any).google.maps.Marker({
          position: { lat: 28.0535, lng: -82.7251 },
          map,
          title: 'Pupperazi Pet Spa - 3454 Tampa Rd, Palm Harbor, FL 34684',
        });
        
        setStatus('SUCCESS: Map created with marker!');
      } catch (error) {
        setStatus(`ERROR: Failed to create map - ${error}`);
      }
    };

    // Try to load immediately
    if ((window as any).google) {
      loadMap();
    } else {
      setStatus('Loading Google Maps script...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        setStatus('Google Maps script loaded. Creating map...');
        setTimeout(loadMap, 100);
      };
      script.onerror = () => {
        setStatus('ERROR: Failed to load Google Maps script');
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">
          Basic Map Test
        </h2>
        <p className="text-gray-600">Status: {status}</p>
      </div>
      
      <div className="card overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-96 md:h-[500px] rounded-xl bg-gray-300"
          style={{ minHeight: '400px' }}
        >
          <div className="flex items-center justify-center h-full text-gray-600">
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}
