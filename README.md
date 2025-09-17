# Plaza Directory

A production-quality frontend for displaying a searchable, filterable directory of plaza businesses. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🗺️ **Interactive Map**: Central map view of The Village with clickable business markers
- 🔍 **Search & Filter**: Search by business name or category, filter by open status, promotions, and category
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⏰ **Real-time Status**: Shows if businesses are currently open based on their hours
- 🎯 **Promotions**: Display current promotions and special offers
- 📅 **Events**: Show upcoming events and special occasions
- 🔄 **Data Freshness**: Track when business information was last updated
- ♿ **Accessible**: Built with accessibility best practices
- 🚀 **Fast**: Optimized for high Lighthouse scores

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API Key (optional, for interactive map)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Google Maps (Optional):**
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Create a `.env.local` file in the root directory
   - Add your API key:
     ```bash
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```
   - **Note**: Without an API key, the map will show a fallback view with business listings

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Export static files:**
   ```bash
   npm run export
   ```

3. **Deploy:**
   The `out/` directory contains all static files ready for deployment to any static hosting service.

## Data Structure

The app supports two data modes:

### Single File Mode (Recommended)
Place your data in `/public/data/plaza.json`:

```json
{
  "plazaName": "Your Plaza Name",
  "lastUpdated": "2025-01-15T06:05:00Z",
  "businesses": [
    {
      "id": "unique-business-id",
      "name": "Business Name",
      "category": "Category",
      "address": "123 Main St, City, State",
      "phone": "(555) 123-4567",
      "website": "https://example.com",
      "hours": {
        "mon": "9 AM–5 PM",
        "tue": "9 AM–5 PM",
        "wed": "9 AM–5 PM",
        "thu": "9 AM–5 PM",
        "fri": "9 AM–5 PM",
        "sat": "10 AM–3 PM",
        "sun": "Closed"
      },
      "promos": [
        {
          "label": "Special Offer",
          "url": "https://example.com/offer"
        }
      ],
      "events": [
        {
          "title": "Event Title",
          "date": "2025-02-15",
          "time": "7 PM",
          "location": "Store",
          "url": "https://example.com/event"
        }
      ],
      "lastScrapedAt": "2025-01-15T06:05:00Z"
    }
  ]
}
```

### Multi-File Mode
1. Create `/public/data/index.json`:
   ```json
   {
     "plazaName": "Your Plaza Name",
     "lastUpdated": "2025-01-15T06:05:00Z",
     "businessFiles": ["business1.json", "business2.json"]
   }
   ```

2. Create individual business files in `/public/data/businesses/`:
   - `business1.json`
   - `business2.json`
   - etc.

## Customization

### Changing Plaza Name
Update the `plazaName` field in your JSON data file.

### Changing Favicon
Replace `/public/favicon.ico` with your own favicon.

### Styling
The app uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Theme configuration
- `app/globals.css` - Global styles and custom components

### Business Hours Format
Hours should be in 12-hour format with AM/PM:
- Single range: `"9 AM–5 PM"`
- Multiple ranges: `"9 AM–12 PM, 1 PM–5 PM"`
- Closed: `"Closed"`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns: `{ ok: boolean, lastUpdated: string, plazaName: string, businessCount: number }`

## Performance

The app is optimized for high Lighthouse scores:
- **Performance**: ≥90
- **Accessibility**: ≥95  
- **Best Practices**: ≥95
- **SEO**: ≥90

## Data Updates

To update business information:

1. **Replace JSON files** in `/public/data/` with new data
2. **Update timestamps** to current time in ISO format
3. **Redeploy** the application

The app will automatically detect stale data (>48 hours old) and show warnings.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── business/[id]/     # Business detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utilities and types
├── public/data/           # JSON data files
└── README.md
```

### Key Components
- `SearchAndFilters` - Search and filter controls
- `BusinessCard` - Business card display
- `BusinessTable` - Table view of businesses
- `Hours` - Hours of operation display
- `PromoBadge` - Promotion display
- `StalenessNotice` - Data freshness indicator

## Troubleshooting

### Data Not Loading
- Check that JSON files are in `/public/data/`
- Verify JSON syntax is valid
- Ensure file permissions allow reading

### Search Not Working
- Clear browser cache
- Check console for JavaScript errors
- Verify search input is not empty

### Hours Not Displaying Correctly
- Ensure hours are in correct format (see Business Hours Format above)
- Check timezone settings (defaults to America/New_York)

## License

MIT License - feel free to use this project for your own plaza directory needs.

## Support

For issues or questions, please check the troubleshooting section above or create an issue in the project repository.