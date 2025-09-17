# Adding Businesses to The Village at Lake St. George Directory

## Current Businesses with Place IDs:

### ✅ Already Added:
1. **Pupperazi Pet Spa**
   - Place ID: `ChIJc29HP3HtwogRSVpv0fYESDg`
   - Address: 3454 Tampa Rd, Palm Harbor, FL 34684
   - Status: ✅ Added to directory

2. **The Wax Pot Body Waxing**
   - Place ID: `ChIJNVc7wJnzwogRsvlIDznATTU`
   - Address: 3466 Tampa Rd, Palm Harbor, FL 34684
   - Status: ✅ Added to directory

3. **Three Brothers New York Pizza**
   - Place ID: `ChIJ9RC7iPPtwogR9JK_73-_8SU`
   - Address: 3436 Tampa Rd, Palm Harbor, FL 34684
   - Status: ✅ Added to directory

4. **Charlie Coffee**
   - Place ID: `ChIJ-ZFB15jtwogRpEcx2izoHr8`
   - Address: 3422 Tampa Rd, Palm Harbor, FL 34684
   - Status: ✅ Added to directory

5. **B J's Pub**
   - Place ID: `ChIJMdVVFnHtwogRnK0Aije0tOE`
   - Address: 3440 Tampa Rd, Palm Harbor, FL 34684
   - Status: ✅ Added to directory

## Process to Add New Businesses:

### Step 1: Find Place ID
- Use the Places Finder at `/places-finder`
- Search for business name + "Tampa Road Palm Harbor"
- Copy the Place ID

### Step 2: Add to Configuration
Update `lib/places.ts`:
```typescript
export const VILLAGE_PLACE_IDS = {
  // ... existing businesses
  'new-business-id': 'ChIJ_PLACE_ID_HERE', // Business Name - Address
};
```

### Step 3: Add Static Data
Update `public/data/plaza.json`:
```json
{
  "id": "new-business-id",
  "name": "Business Name",
  "category": "Category",
  "address": "Full Address",
  "phone": "Phone Number",
  "website": "Website URL",
  "hours": {
    "mon": "Hours",
    "tue": "Hours",
    "wed": "Hours",
    "thu": "Hours",
    "fri": "Hours",
    "sat": "Hours",
    "sun": "Hours"
  },
  "promos": [],
  "events": [],
  "lastScrapedAt": "2025-09-17T14:00:00Z"
}
```

### Step 4: Test & Deploy
1. Run `npm run build` to test
2. Test locally at `http://localhost:3002`
3. Click "Show Live Data" to verify Google Places integration
4. Commit and push to deploy

## Categories Available:
- Pet Services
- Beauty & Wellness
- Restaurant
- Coffee & Cafe
- Bar & Restaurant
- Healthcare
- Retail
- Professional Services
- Entertainment
- Fitness & Recreation
