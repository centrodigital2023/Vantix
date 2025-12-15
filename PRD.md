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

**Smart Accommodation Cards with Integrated Booking**
- Functionality: Enhanced accommodation cards with hover effects revealing quick booking options, detailed view dialogs, and direct integration with booking and payment systems without leaving the card interface
- Purpose: Streamline the booking process by reducing friction and enabling users to complete reservations with minimal clicks
- Trigger: User views accommodation listings, hovers over cards, or clicks booking CTAs
- Progression: View card → Hover to reveal actions → Quick book OR view full details → Select room type → Choose dates → Process payment → Confirm booking
- Success criteria: Cards load images smoothly with carousel, hover states show actions within 200ms, quick book opens dialog instantly, full details load all room types, payment integration seamless, booking confirmed in <30 seconds from card click
- Functionality: Complete end-to-end booking system with Mercado Pago payment processing
- Purpose: Enable users to securely book accommodations and complete payments
- Trigger: Click "Reservar" button on room card in accommodation detail page
- Progression: Select dates/guests → Fill guest information → Review booking summary → Process payment via Mercado Pago → Receive confirmation
- Success criteria: Secure payment processing, booking data persistence, email confirmations, booking history tracking

**Intelligent Footer Subpages with Internal Linking**
- Functionality: Comprehensive footer with 60+ organized subpages covering help, destinations, SEO-optimized local content, experiences, company info, legal, blog, partners, and offers
- Purpose: Improve SEO, provide easy navigation to all platform features, create intelligent internal linking structure that connects related content
- Trigger: User clicks footer links
- Progression: Navigate to specialized pages → See related content links → Discover connected experiences → Return to main actions
- Success criteria: All footer links functional, pages load quickly, intelligent cross-linking improves user journey and SEO

**AI-Powered Dynamic Content for Blog and Articles**
- Functionality: Generates blog posts, articles, and tourism news dynamically using GPT-4o-mini AI, with persistent storage and regeneration capabilities
- Purpose: Provide fresh, relevant, and engaging content that inspires travelers and showcases Colombia's tourism opportunities without manual content creation
- Trigger: User visits blog/articles/news pages, or clicks "Generate Content with IA" button
- Progression: Load page → Check for existing content → Generate new content if needed → Display cards → Click to read full article → View in dialog with markdown rendering
- Success criteria: Content generates in <30 seconds, persists between sessions, articles are coherent and informative, images load properly, search and filtering work smoothly

**Personalized Feed with Learning Preferences**
- Functionality: Tracks user interactions (views, clicks, searches, bookings) across the platform and uses machine learning algorithms to generate personalized accommodation and category recommendations with AI-powered enhancements including weather-based recommendations, collaborative filtering, and real-time push notifications
- Purpose: Improve user experience by surfacing relevant content based on individual behavior patterns, weather conditions, seasonal events, and similar user preferences, increasing engagement and conversion rates
- Trigger: User navigates to "Para Ti" (feed-personalizado) page from navbar
- Progression: Visit feed → View personalized recommendations → See favorite categories highlighted → Browse recommended accommodations with reasoning → View weather-based suggestions → Explore collaborative recommendations from similar users → Receive push notifications for new matches → Clear history if desired
- Success criteria: Tracks all user interactions persistently, calculates preference scores accurately, recommendations update in real-time, displays clear reasoning for each recommendation, weather integration provides relevant seasonal suggestions, collaborative filtering matches with similar users, push notifications delivered for high-priority recommendations, maintains history across sessions

**AI-Powered Weather & Seasonal Event Recommendations**
- Functionality: Analyzes current weather conditions, temperature, humidity, and upcoming seasonal events to generate intelligent destination recommendations that match the climate and time of year
- Purpose: Help users discover destinations that are ideal for current weather conditions and take advantage of cultural events happening nearby
- Trigger: Automatically loads when accessing personalized feed, updates daily
- Progression: Fetch weather data → Analyze temperature and conditions → Match with destination categories → Find upcoming events → Score and rank destinations → Display with weather reasoning → Notify users of ideal conditions
- Success criteria: Weather data updates automatically, recommendations change based on conditions, seasonal events integrated with 3-month lookahead, clear explanation of why destination matches weather, notifications sent for perfect conditions

**Collaborative Filtering with Similar Users**
- Functionality: Implements advanced collaborative filtering algorithms to find users with similar preferences and recommend accommodations based on what similar users have viewed, clicked, and booked
- Purpose: Discover hidden gems and popular choices among users with matching travel styles and interests
- Trigger: Background analysis of user interactions compared against anonymized user pool
- Progression: Track user behavior → Calculate similarity scores using cosine similarity and Jaccard index → Find top similar users → Aggregate their preferences → Generate recommendations → Display with confidence scores → Notify of high-confidence matches
- Success criteria: Identifies 5-10 similar users minimum, recommendations have >60% confidence score, reasons explain shared interests, updates as more users join platform, privacy-preserving (no personal data exposed)

**Push Notification System for Smart Recommendations**
- Functionality: Real-time notification system that alerts users about new recommendations matching their interests, weather opportunities, upcoming events, price drops, and collaborative suggestions
- Purpose: Re-engage users with timely, relevant information that enhances their travel planning experience
- Trigger: New matching recommendation detected, weather changes favorably, event approaching, similar user books
- Progression: System detects match → Checks user notification preferences → Creates notification → Sends browser push notification → Stores in notification center → User clicks to view details
- Success criteria: Notifications respect user preferences, support browser push API, categorized by type (weather/event/collaborative/price), priority system (high/medium/low), mark as read functionality, notification history persists, opt-out available

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
- **Payment Failures**: Handle declined payments gracefully with clear next steps and retry options
- **Booking Conflicts**: Check room availability in real-time before processing payment
- **Incomplete Guest Information**: Validate all required fields before allowing payment
- **Payment Timeout**: Handle Mercado Pago session timeouts with booking data preservation
- **Network Interruptions**: Save booking state locally and resume when connection restored

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
