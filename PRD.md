# Planning Guide

SendAI is a comprehensive tourism booking platform for Colombia (similar to Booking.com but specialized for Colombian tourism) that combines AI-powered itinerary generation with real-time accommodation booking, reviews, price comparison, and authentic local experiences across all tourism categories.

**Experience Qualities**:
1. **Inspiring** - Showcases Colombia's diverse beauty through vivid imagery and compelling stories that ignite wanderlust
2. **Intelligent** - Leverages AI (Gemini, SerpApi) to create personalized itineraries based on real-time data and user preferences
3. **Trustworthy** - Provides verified accommodations and genuine reviews to build confidence in travel decisions

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This platform requires multiple interconnected features: AI-powered itinerary generation, category-based browsing, property owner dashboards, search functionality, blog content, and booking management across 10 distinct tourism categories.

## Essential Features

**AI Itinerary Generator**
- Functionality: Uses Gemini AI and SerpApi to create personalized multi-day travel plans with accommodations, dining, and activities
- Purpose: Eliminates trip planning friction by providing intelligent, data-driven recommendations
- Trigger: User selects preferences (category, dates, budget, interests) on Itinerary page
- Progression: Select preferences → AI analyzes → Generate itinerary → Display day-by-day plan → Save/modify → Export
- Success criteria: Generates coherent 3-7 day itinerary in <10 seconds with real accommodation and restaurant data

**Category Exploration**
- Functionality: Browse 10 tourism categories (Adventure, Wellness, Cultural, Family, Gastronomy, Nature, Business, Beach, Religious, Rural) with dedicated landing pages
- Purpose: Helps travelers discover destinations aligned with their interests
- Trigger: Click category card on homepage or navigation menu
- Progression: View category → See featured destinations → Filter by region/price → View details → Add to itinerary
- Success criteria: Each category displays 20+ relevant destinations with filtering options

**Property Owner Dashboard**
- Functionality: SaaS portal for accommodation owners to manage listings, view analytics, and update availability with user authentication
- Purpose: Enables property owners to maintain current information and track performance securely
- Trigger: Login via /propietarios route (redirects to authentication if not logged in)
- Progression: Login/Signup → View dashboard → Manage listings → Add/Edit/Delete properties → View statistics
- Success criteria: Owners can authenticate, update listings in <2 minutes, view booking analytics, and manage properties securely

**Smart Search**
- Functionality: Real-time search across destinations, accommodations, and experiences with filters
- Purpose: Quick discovery of specific locations or experiences
- Trigger: User types in search bar on any page
- Progression: Type query → View instant results → Apply filters (category, price, rating) → Select result → View details
- Success criteria: Returns relevant results in <500ms, filters work instantly

**User Authentication**
- Functionality: Secure login and signup system for property owners with persistent sessions
- Purpose: Protect property management features and associate listings with owners
- Trigger: Accessing /propietarios or /registro-alojamiento routes without authentication
- Progression: View login/signup modal → Enter credentials → Authenticate → Access protected features → Manage session
- Success criteria: Authentication persists across sessions, secure credential handling, graceful handling of auth states

**Destination Results**
- Functionality: Grid/list view of search results or category browsing with detailed cards
- Purpose: Compare multiple options before making decisions
- Trigger: After search or category selection
- Progression: View results → Sort by criteria → Filter → Compare → Select destination → View full details
- Success criteria: Display 50+ results with smooth infinite scroll

## Edge Case Handling

- **No Search Results**: Display suggested popular destinations and related categories
- **AI Generation Failure**: Show fallback pre-curated itineraries for the selected category
- **Offline Access**: Cache last viewed itinerary and show banner indicating limited functionality
- **Invalid Date Ranges**: Automatically correct to minimum 1-day trip with helpful message
- **Property Owner Verification**: Require authentication before allowing property registration or management
- **Duplicate Listings**: AI-powered detection to prevent same property being listed multiple times
- **Unauthenticated Access**: Gracefully redirect to login modal when accessing protected owner features
- **Session Persistence**: Maintain user authentication across page refreshes and browser sessions
- **Invalid Credentials**: Clear error messaging for failed login attempts with retry capability

## Design Direction

The design should evoke the vibrant, colorful essence of Colombia - warm, welcoming, and full of life. It should feel adventurous yet trustworthy, modern yet culturally grounded. Think lush greens meeting Caribbean blues, coffee-rich earth tones accented by tropical florals. The interface should breathe with generous spacing, making complex travel planning feel effortless and inspiring.

## Color Selection

The palette draws from Colombia's natural diversity: lush rainforests, Caribbean coastlines, coffee plantations, and vibrant colonial architecture.

- **Primary Color**: Deep Emerald Green `oklch(0.45 0.15 155)` - Represents Colombia's rich nature and coffee heritage, used for primary CTAs and navigation
- **Secondary Colors**: 
  - Warm Terracotta `oklch(0.62 0.12 45)` - Colonial architecture warmth, for secondary buttons and accents
  - Caribbean Turquoise `oklch(0.70 0.12 210)` - Coastal beauty, for informational elements
- **Accent Color**: Vibrant Coral `oklch(0.68 0.18 25)` - Tropical flower energy for CTAs, active states, and important highlights
- **Foreground/Background Pairings**:
  - Primary Emerald on White background: White text `oklch(0.98 0 0)` - Ratio 7.2:1 ✓
  - Coral Accent on White: White text `oklch(0.98 0 0)` - Ratio 4.9:1 ✓
  - Terracotta on White: Dark text `oklch(0.25 0 0)` - Ratio 5.8:1 ✓
  - Turquoise on White: Dark text `oklch(0.25 0 0)` - Ratio 5.2:1 ✓

## Font Selection

Typography should balance modern clarity with a hint of adventure and sophistication, reflecting both the tech platform and the cultural richness of Colombia.

- **Primary Font**: Outfit (Google Fonts) - A geometric sans-serif with warmth and approachability, perfect for travel inspiration
- **Secondary Font**: Manrope (Google Fonts) - Clean, readable for body text and descriptions

- **Typographic Hierarchy**:
  - H1 (Hero Headlines): Outfit Bold/48px/tight letter spacing (-0.02em)
  - H2 (Section Titles): Outfit SemiBold/32px/normal spacing
  - H3 (Card Titles): Outfit Medium/24px/normal spacing
  - Body (Content): Manrope Regular/16px/1.6 line height
  - Small (Metadata): Manrope Regular/14px/muted color
  - CTA Buttons: Outfit SemiBold/16px/uppercase with wide spacing (0.05em)

## Animations

Animations should evoke the flow of travel - smooth transitions that feel like journeying from one place to another. Use subtle parallax on hero images, gentle fades for content loading, and satisfying micro-interactions on cards (lift on hover with soft shadow growth). The AI itinerary generation should have a thoughtful loading state with progressive reveals. Category cards should cascade in with staggered delays. All animations stay under 400ms to maintain snappiness.

## Component Selection

- **Components**:
  - Hero: Custom full-viewport component with parallax background using framer-motion
  - Navigation: Custom sticky navbar with glass morphism effect (backdrop-blur)
  - Cards: Shadcn Card with custom hover states and image overlays
  - Tabs: Shadcn Tabs for category filtering and itinerary day switching
  - Dialog: Shadcn Dialog for property details and booking forms
  - Form: Shadcn Form with react-hook-form for search and property registration
  - Toast: Sonner for success/error notifications
  - Button: Shadcn Button with custom gradient variants
  - Badge: Shadcn Badge for category tags and price indicators
  - Separator: Subtle dividers between sections
  
- **Customizations**:
  - Custom CategoryCard with image overlays, gradient masks, and hover zoom
  - Custom SearchBar with autocomplete and filter pills
  - Custom ItineraryTimeline using custom components for day-by-day display
  - Custom TestimonialCarousel using embla-carousel-react
  - Custom PropertyOwnerDashboard with chart components for analytics

- **States**:
  - Buttons: Solid fills with brightness shift on hover, press state reduces scale to 0.97, disabled at 40% opacity
  - Inputs: 2px border that changes to accent color on focus, with subtle inner shadow
  - Cards: Lift 8px on hover with shadow expansion, active state adds accent border
  - Loading: Skeleton screens for content areas, spinning icon for AI generation

- **Icon Selection**: 
  - Phosphor Icons throughout for consistency
  - MagnifyingGlass for search
  - Compass for explore
  - MapPin for locations
  - Calendar for dates
  - Heart for favorites
  - User for profile
  - ChartLine for analytics
  - Plus for adding items

- **Spacing**: 
  - Section padding: py-16 md:py-24
  - Container max-width: max-w-7xl
  - Card gaps: gap-6 md:gap-8
  - Button padding: px-6 py-3
  - Consistent 4/8/16/24/32/48px rhythm

- **Mobile**: 
  - Hamburger menu for navigation on <768px
  - Stack category cards vertically on mobile
  - Single column layout for itinerary on mobile
  - Bottom sheet for filters instead of sidebar
  - Touch-optimized 48px minimum tap targets
  - Collapsible sections for property details
