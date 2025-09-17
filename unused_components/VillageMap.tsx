'use client';

import { useEffect, useRef, useState } from 'react';
import { Business } from '@/lib/types';

interface VillageMapProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onBusinessSelect?: (business: Business | null) => void;
}

export default function VillageMap({ businesses, selectedBusiness, onBusinessSelect }: VillageMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Village center coordinates (3414 Tampa Rd, Palm Harbor, FL 34684)
  const villageCenter = {
    lat: 28.0844, // Palm Harbor, FL - Tampa Road area
    lng: -82.7631
  };

  // Initialize Google Maps
  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Map loading timeout, showing fallback');
        setMapError(true);
        setIsLoaded(true);
      }
    }, 8000); // 8 second timeout

    const initMap = () => {
      if (!mapRef.current) {
        console.log('Map ref not ready');
        return;
      }

      console.log('Initializing map...');
      const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
        center: villageCenter,
        zoom: 18, // Closer zoom to show plaza details
        mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ weight: '2.00' }]
          },
          {
            featureType: 'all',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#9c9c9c' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#f2f2f2' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#eeeeee' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#7b7b7b' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [{ visibility: 'simplified' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#c8d7d4' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#070707' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }]
          }
        ]
      });

      setMap(mapInstance);
      setIsLoaded(true);
      console.log('Map initialized successfully');
    };

    // Load Google Maps script if not already loaded
    if (typeof window !== 'undefined' && !window.google) {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo';
      console.log('Loading Google Maps with API key:', apiKey.substring(0, 10) + '...');
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        setTimeout(initMap, 100); // Small delay to ensure DOM is ready
      };
      script.onerror = (error) => {
        console.error('Google Maps failed to load:', error);
        setMapError(true);
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    } else if (typeof window !== 'undefined' && window.google) {
      console.log('Google Maps already loaded');
      setTimeout(initMap, 100);
    }

    // Cleanup timeout
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Create business markers
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: any[] = businesses.map((business, index) => {
      // Generate coordinates around the village center (3414 Tampa Rd)
      // Create a more realistic plaza layout
      const angle = (index * 2 * Math.PI) / businesses.length; // Distribute in a circle
      const radius = 0.0003; // Small radius for plaza layout
      
      const offsetLat = Math.cos(angle) * radius;
      const offsetLng = Math.sin(angle) * radius;
      
      const position = {
        lat: villageCenter.lat + offsetLat,
        lng: villageCenter.lng + offsetLng
      };

      const marker = new (window as any).google.maps.Marker({
        position,
        map,
        title: business.name,
        animation: (window as any).google.maps.Animation.DROP,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: selectedBusiness?.id === business.id ? '#0ea5e9' : '#0284c7',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      });

      // Create info window
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div class="p-4 max-w-xs">
            <h3 class="font-bold text-lg text-gray-900 mb-2">${business.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${business.category || 'Business'}</p>
            ${business.address ? `<p class="text-sm text-gray-500 mb-3">${business.address}</p>` : ''}
            <div class="flex space-x-2">
              ${business.phone ? `
                <a href="tel:${business.phone}" class="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors">
                  📞 Call
                </a>
              ` : ''}
              ${business.website ? `
                <a href="${business.website}" target="_blank" class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors">
                  🌐 Website
                </a>
              ` : ''}
            </div>
          </div>
        `
      });

      // Add click listeners
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onBusinessSelect) {
          onBusinessSelect(business);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Cleanup function
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, businesses, selectedBusiness, onBusinessSelect, isLoaded]);

  // Center map on selected business
  useEffect(() => {
    if (map && selectedBusiness) {
      const businessMarker = markers.find(marker => 
        marker.getTitle() === selectedBusiness.name
      );
      if (businessMarker) {
        map.panTo(businessMarker.getPosition()!);
        businessMarker.setAnimation((window as any).google.maps.Animation.BOUNCE);
        setTimeout(() => {
          businessMarker.setAnimation(null);
        }, 2000);
      }
    }
  }, [selectedBusiness, map, markers]);

  // Debug logging
  console.log('Map state:', { 
    isLoaded, 
    mapError, 
    hasGoogle: typeof window !== 'undefined' && !!window.google,
    mapRef: !!mapRef.current,
    businessesCount: businesses.length
  });

  // Fallback map when Google Maps isn't available or failed to load
  if (mapError || (!isLoaded && typeof window !== 'undefined' && !window.google)) {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Explore The Village
          </h2>
          <p className="text-gray-600">
            Interactive map coming soon! View our businesses below.
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
              To enable the interactive map, add your Google Maps API key to the environment variables.
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
          Click on any marker to learn more about our businesses
        </p>
      </div>
      
      <div className="card overflow-hidden relative">
        <div 
          ref={mapRef} 
          className="w-full h-96 md:h-[500px] rounded-xl bg-gray-100"
          style={{ minHeight: '400px' }}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
