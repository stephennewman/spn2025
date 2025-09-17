// Singleton Google Maps loader to prevent multiple script loads
let isGoogleMapsLoaded = false;
let isGoogleMapsLoading = false;
let loadPromise: Promise<void> | null = null;

export const loadGoogleMaps = (): Promise<void> => {
  // If already loaded, return resolved promise
  if (isGoogleMapsLoaded && window.google) {
    return Promise.resolve();
  }

  // If currently loading, return the existing promise
  if (isGoogleMapsLoading && loadPromise) {
    return loadPromise;
  }

  // Start loading
  isGoogleMapsLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      reject(new Error('Google Maps API key not found'));
      return;
    }

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      console.log('Google Maps loaded successfully');
      resolve();
    };
    
    script.onerror = (error) => {
      isGoogleMapsLoading = false;
      console.error('Failed to load Google Maps:', error);
      reject(error);
    };

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      // Script exists but might not be loaded yet
      if (window.google) {
        isGoogleMapsLoaded = true;
        isGoogleMapsLoading = false;
        resolve();
      } else {
        // Wait for existing script to load
        existingScript.addEventListener('load', () => {
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          resolve();
        });
        existingScript.addEventListener('error', reject);
      }
    } else {
      // Add new script
      document.head.appendChild(script);
    }
  });

  return loadPromise;
};

export const isGoogleMapsReady = (): boolean => {
  return isGoogleMapsLoaded && !!window.google;
};
