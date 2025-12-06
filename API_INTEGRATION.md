# API Integration Documentation - SendAI Tourism Platform

## Overview

This document describes the comprehensive API integration system implemented for the SendAI Colombian tourism platform. The system automatically fetches and updates tourism data every 24 hours from multiple sources.

## Configured APIs

### 1. **Pexels API** (Image Provider)
- **Purpose**: High-quality tourism images for categories and destinations
- **Key**: `BTwqq2C2wgW1JIK0hKXU3IFdheqFPNSGD1k7SIKd2LKVKlq5aUY39VbF`
- **Endpoint**: `https://api.pexels.com/v1`
- **Rate Limit**: 200 requests/hour
- **Implementation**: `src/lib/api/pexels.ts`

**Features**:
- Search images by category (Adventure, Wellness, Cultural, etc.)
- Get destination-specific images
- Automatic Spanish locale support
- Fallback to generic Colombian tourism images

### 2. **API Colombia** (Official Colombia Data)
- **Purpose**: Official data about Colombian cities, departments, and tourist attractions
- **Base URL**: `https://api-colombia.com/api/v1`
- **Authentication**: Public API (no key required)
- **Implementation**: `src/lib/api/colombia.ts`

**Endpoints Used**:
- `/City` - Get all Colombian cities
- `/Department` - Get all departments
- `/TouristAttraction` - Get official tourist attractions
- `/City/{id}` - Get specific city details
- `/City/name/{name}` - Search cities by name

### 3. **Geoapify** (Location Services)
- **Purpose**: Geocoding, place details, and nearby attractions
- **API Key**: `4247471f71c943ceb8a629a2884d4b52`
- **Project ID**: `A9kbyuVSd3zOOxVpZ3x1`
- **Base URL**: `https://api.geoapify.com`
- **Rate Limit**: 3000 requests/day
- **Implementation**: `src/lib/api/geoapify.ts`

**Features**:
- Search places in Colombia
- Get place details by ID
- Autocomplete for location search
- Find nearby attractions by coordinates
- Filter by category (restaurants, hotels, museums, etc.)

### 4. **SerpAPI** (Google Data Aggregation)
- **Purpose**: Access Google Flights, Hotels, Images, Maps, and Reviews data
- **API Key**: `2793125b8f2684df7c7677d0677385f2624d3bf21184d5c5d1d737e726f2490b`
- **Base URL**: `https://serpapi.com/search`
- **Rate Limit**: 100 requests/hour
- **Implementation**: `src/lib/api/serpapi.ts`

**Engines Used**:
- `google_flights` - Flight availability and prices
- `google_hotels` - Hotel listings and rates
- `google_images` - Tourism images from Google
- `google_local` - Local business and attractions
- `google_maps_reviews` - User reviews and ratings

### 5. **RapidAPI Services** (Additional Data)
- **API Key**: `859275b919mshc1241a9dd04ce6bp106d7ajsn9ab4f347e3b4`
- **Services Available**:
  - ScrapeNinja - Web scraping
  - Facebook Pages Scraper - Social media data
  - The Web Scraping API - Browser automation

## Data Synchronization System

### Architecture

The sync system is implemented in `src/lib/api/sync.ts` and manages:

1. **Data Fetching**: Retrieves data from all configured APIs
2. **Data Enrichment**: Combines data from multiple sources
3. **Caching**: Stores enriched data in Spark KV storage
4. **Automatic Updates**: Checks and updates data every 24 hours

### Sync Flow

```
┌─────────────────┐
│  App Loads      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Last Sync │◄── Reads from KV storage
└────────┬────────┘
         │
         ▼
    ┌────┴────┐
    │ Expired?│
    └────┬────┘
      Yes│  │No
         │  └──► Use cached data
         ▼
┌─────────────────┐
│ Fetch API Data  │
│  - Pexels       │
│  - Colombia API │
│  - Geoapify     │
│  - SerpAPI      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Enrich Data     │
│  - Combine      │
│  - Validate     │
│  - Format       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Store in KV     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update UI       │
└─────────────────┘
```

### Cache Keys

- `tourism-categories-cache-{CategoryName}` - Cached category data
- `tourism-destinations-cache` - All destinations
- `tourism-last-sync` - Timestamp of last sync

### Data Structure

```typescript
interface EnrichedDestination {
  id: string
  name: string
  category: string
  region: string
  description: string
  images: string[]          // From Pexels + SerpAPI
  price: number            // Generated/from SerpAPI Hotels
  rating: number           // From SerpAPI Local/Reviews
  featured: boolean
  location: {
    lat: number           // From Geoapify
    lon: number           // From Geoapify
    city: string          // From Colombia API
    department: string    // From Colombia API
  }
  hotels?: Array<{       // From SerpAPI Hotels
    name: string
    price: number
    rating: number
    image: string
  }>
  activities?: string[]  // From Geoapify
  reviews?: number       // From SerpAPI Reviews
  lastUpdated: number
}
```

## Component Integration

### React Hooks

**`useCategoryData(categoryName: string)`**
- Automatically fetches category data
- Handles loading and error states
- Returns enriched destinations

**`useInitializeSync()`**
- Initializes the sync system on app load
- Checks cache expiration
- Triggers background sync if needed

### Components

**`CategoryCard`** (`src/components/CategoryCard.tsx`)
- Displays category with dynamic images from Pexels
- Lazy loads images with fallback
- Shows loading states

**`DestinationCard`** (`src/components/DestinationCard.tsx`)
- Shows enriched destination data
- Displays ratings, reviews, price
- Multiple images carousel
- Location information

**`CategoryTemplate`** (`src/components/CategoryTemplate.tsx`)
- Header with dynamic category image
- Consistent layout for all category pages

## Usage Examples

### Initialize Sync on App Load

```typescript
import { useInitializeSync } from '@/hooks/use-category-data'

function App() {
  useInitializeSync() // Automatically checks and syncs data
  // ... rest of app
}
```

### Load Category Data

```typescript
import { useCategoryData } from '@/hooks/use-category-data'

function CategoryPage() {
  const { data, loading, error } = useCategoryData('Aventura')
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  
  return (
    <div>
      {data.destinations.map(dest => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  )
}
```

### Manual Sync Trigger

```typescript
import { syncAllCategories } from '@/lib/api/sync'

async function refreshAllData() {
  await syncAllCategories()
  console.log('Data refreshed!')
}
```

## Rate Limiting & Best Practices

### Rate Limit Handling

The system respects API rate limits through:

1. **Caching**: 24-hour cache reduces API calls
2. **Delays**: 2-second delays between category syncs
3. **Fallbacks**: Uses cached data if APIs fail
4. **Error Handling**: Graceful degradation

### Configuration

```typescript
// src/lib/api/config.ts
export const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export const RATE_LIMITS = {
  serpapi: { maxRequests: 100, perMilliseconds: 3600000 },
  geoapify: { maxRequests: 3000, perMilliseconds: 86400000 },
  pexels: { maxRequests: 200, perMilliseconds: 3600000 }
}
```

## Security Considerations

### API Keys Storage

- API keys are stored in `src/lib/api/config.ts`
- **Note**: For production, move to environment variables
- Never commit sensitive keys to public repositories

### Recommended Production Setup

```typescript
// Use environment variables in production
export const API_CONFIG = {
  serpapi: {
    key: process.env.SERPAPI_KEY || '',
    baseUrl: 'https://serpapi.com/search'
  },
  // ... other configs
}
```

## Automatic Updates

### How 24-Hour Auto-Update Works

1. **On App Load**: `useInitializeSync()` hook checks last sync timestamp
2. **Cache Check**: Compares current time with last sync
3. **Expired?**: If > 24 hours, triggers background sync
4. **Background Sync**: Fetches data without blocking UI
5. **Storage**: Saves to Spark KV with new timestamp
6. **Re-render**: Components automatically update with new data

### Manual Refresh

Users can manually refresh data:

```typescript
// In component
<Button onClick={() => window.location.reload()}>
  Refresh Data
</Button>
```

## Error Handling

### Fallback Strategy

```
API Request Failed
     │
     ▼
Try Cached Data
     │
     ├─ Found ──► Use Cached
     │
     └─ Not Found ──► Use Placeholder Data
```

### Error Messages

- Network errors: "Unable to connect. Using cached data."
- API errors: "API temporarily unavailable. Showing cached results."
- No data: "No destinations available. Please try again later."

## Testing API Integration

### Test Individual APIs

```typescript
// Test Pexels
import { searchPexelsImages } from '@/lib/api/pexels'
const images = await searchPexelsImages('Colombia beach', 10)
console.log(images)

// Test Colombia API
import { getColombiaCities } from '@/lib/api/colombia'
const cities = await getColombiaCities()
console.log(cities)

// Test Geoapify
import { searchPlaces } from '@/lib/api/geoapify'
const places = await searchPlaces('Cartagena Colombia')
console.log(places)

// Test SerpAPI
import { searchHotels } from '@/lib/api/serpapi'
const hotels = await searchHotels('Bogota', '2024-12-01', '2024-12-05')
console.log(hotels)
```

### Test Full Sync

```typescript
import { syncCategoryData } from '@/lib/api/sync'
const data = await syncCategoryData('Aventura')
console.log(data)
```

## Performance Optimization

### Image Loading

- **Lazy Loading**: Images load only when visible
- **Progressive Loading**: Show placeholder → thumbnail → full image
- **Error Fallbacks**: Automatic fallback to backup images
- **CDN**: Pexels provides optimized CDN URLs

### Data Loading

- **Skeleton Screens**: Show loading state
- **Progressive Enhancement**: Show cached data immediately
- **Background Updates**: Fetch new data without blocking
- **Partial Updates**: Update categories independently

## Monitoring & Logging

### Console Logs

The sync system logs important events:

```
Starting full data sync for all categories...
Syncing data for category: Aventura
Successfully synced 15 destinations for Aventura
Full data sync completed!
```

### Error Logging

```
Error fetching Pexels images: [error details]
Error syncing category Aventura: [error details]
```

## Future Enhancements

1. **Admin Dashboard**: Monitor sync status and API usage
2. **Webhook Integration**: Real-time updates from APIs
3. **Advanced Caching**: Redis or CloudFlare KV for better performance
4. **Analytics**: Track API usage and costs
5. **A/B Testing**: Test different data sources
6. **AI Enhancement**: Use LLM to generate better descriptions

## Support & Troubleshooting

### Common Issues

**Images not loading**:
- Check Pexels API key
- Verify network connectivity
- Check browser console for CORS errors

**Data not updating**:
- Clear KV cache: `window.spark.kv.delete('tourism-last-sync')`
- Check API rate limits
- Verify API keys are valid

**Performance issues**:
- Reduce sync frequency
- Limit number of destinations per category
- Implement pagination

## API Documentation Links

- [Pexels API Docs](https://www.pexels.com/api/documentation/)
- [API Colombia Docs](https://api-colombia.com/)
- [Geoapify Docs](https://www.geoapify.com/docs/)
- [SerpAPI Docs](https://serpapi.com/docs)
