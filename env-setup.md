# Environment Setup for Google Places API

To enable Google Places API integration, create a `.env.local` file in the project root with:

```bash
# Google Places API Configuration
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

## How to get your API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Places API" for your project
4. Go to "Credentials" and create an API key
5. Copy the API key to your `.env.local` file

## Quick Setup:

```bash
# Create the environment file
echo "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here" > .env.local

# Replace 'your_api_key_here' with your actual API key
```

Once set up, the Places integration will automatically fetch live data from Google Places API including:
- Real-time business hours and open/closed status
- Customer reviews and ratings
- Photos
- Phone numbers and websites
- Live business status

The app will gracefully fallback to static data if the API key is not configured.
