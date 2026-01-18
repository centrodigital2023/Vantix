# Vantix - Complete Tourism Marketplace PRD

Vantix is the ultimate tourism marketplace combining the best features of Booking.com (comprehensive accommodations), Airbnb (unique experiences & hosts), and Trivago (price comparison & smart filtering) to create Colombia's premier travel booking platform.

**Experience Qualities**:
1. **Comprehensive** - Every accommodation option with real-time availability, instant booking, and price transparency like Booking.com
2. **Personal** - Authentic local experiences, host profiles, and verified reviews like Airbnb
3. **Smart** - Intelligent price comparison, deal alerts, and AI-powered recommendations like Trivago

**Complexity Level**: Complex Application (advanced functionality with multiple integrated views)
- Multi-vendor marketplace with host management, booking engine, payment processing, review system, AI recommendations, price comparison, and real-time availability tracking across accommodations, experiences, and services

## Essential Features to Complete

### **Multi-Platform Price Comparison (Trivago-inspired)**
- Functionality: Compare prices from multiple sources, show best deals, track price history, set price alerts
- Purpose: Help users find the absolute best price for accommodations
- Trigger: User searches for accommodations or views property details
- Progression: Search → View results with price comparison → See price history chart → Set price alerts → Compare room types → Book best deal
- Success criteria: Shows 3+ price points per property, price alerts work, savings highlighted, booking redirects seamlessly

### **Instant Booking with Calendar Availability (Booking.com-inspired)**
- Functionality: Real-time calendar showing availability, instant booking without host approval, automated confirmations
- Purpose: Enable quick, confirmed bookings for travelers
- Trigger: User selects dates on property detail page
- Progression: Select dates → Check availability → Choose room type → Enter guest info → Process payment → Instant confirmation
- Success criteria: Calendar updates in real-time, no double bookings, confirmation within 3 seconds

### **Host Profiles & Verified Reviews (Airbnb-inspired)**
- Functionality: Detailed host profiles with photos, bio, response time, verified badge, guest reviews
- Purpose: Build trust and showcase the personal touch of hosts
- Trigger: View host profile link from property listing
- Progression: Click host name → View profile → See all properties → Read reviews → Message host → View response rate
- Success criteria: Every host has profile, verified badge shown, reviews display prominently

### **Experience Marketplace (Airbnb Experiences)**
- Functionality: Bookable local experiences (tours, cooking classes, adventures) hosted by locals
- Purpose: Go beyond accommodation to offer complete travel experiences
- Trigger: Browse "Experiencias" category or see recommendations on property pages
- Progression: Browse experiences → Filter by category/date → View experience details → Read host bio → Check availability → Book → Receive confirmation
- Success criteria: 50+ experiences listed, booking flow smooth, host communication enabled

### **Smart Filtering & Sort Options**
- Functionality: Advanced filters (price range, amenities, property type, cancellation policy, instant book, superhost) with live result counts
- Purpose: Help users narrow down thousands of options quickly
- Trigger: User accesses filter panel on search results page
- Progression: Apply filters → Results update instantly → See result count → Refine → Sort by price/rating/distance → View filtered results
- Success criteria: Filters apply without page reload, result count accurate, can combine multiple filters

### **Guest & Host Messaging System**
- Functionality: In-app messaging between guests and hosts, pre-booking questions, booking confirmations, automated messages
- Purpose: Enable communication for questions, special requests, and coordination
- Trigger: Click "Contactar anfitrión" on property page or from booking confirmation
- Progression: Open chat → Send message → Host receives notification → Host replies → Guest notified → Continue conversation
- Success criteria: Messages delivered instantly, notifications work, chat history persists

### **Flexible Cancellation Policies**
- Functionality: Multiple cancellation policy tiers (flexible, moderate, strict), clear refund rules, grace periods
- Purpose: Give both guests and hosts flexibility and protection
- Trigger: View cancellation terms on property page or during booking
- Progression: Review policy → Make booking → If needed: cancel booking → Refund processed → Both parties notified
- Success criteria: Policies clearly displayed, refund calculations automatic, 3 policy tiers available

### **Wishlists & Saved Properties**
- Functionality: Create named wishlists, save properties, share lists, track price changes
- Purpose: Help users organize trip planning and track favorite properties
- Trigger: Click heart icon on property card or "Guardar" button
- Progression: Save property → Choose/create wishlist → View wishlist → Get notifications on price drops → Share list → Book from list
- Success criteria: Unlimited wishlists, shareable links, price drop alerts work

### **Dynamic Pricing & Deals**
- Functionality: Last-minute deals, early bird discounts, long-stay discounts, seasonal pricing, flash sales
- Purpose: Maximize bookings for hosts and provide value for guests
- Trigger: Browse properties with active deals or view "Ofertas" page
- Progression: See deal badge → View discount details → Calculate savings → Book with discount applied → See final price
- Success criteria: Deals clearly marked, savings calculated automatically, expiration countdown shown

### **Verified Photos & Virtual Tours**
- Functionality: Professional photos, 360° virtual tours, photo verification badges, guest photos
- Purpose: Show accurate property representation and build trust
- Trigger: View property gallery or click "Tour virtual" button
- Progression: Open gallery → Navigate photos → Launch 360° tour → Pan around rooms → Exit tour → Compare with guest photos
- Success criteria: High-quality images load fast, 360° tours smooth, verification badges visible

### **Multi-Currency & Language Support**
- Functionality: Display prices in user's currency, automatic conversion, multiple language options
- Purpose: Make platform accessible to international travelers
- Trigger: User selects currency/language from dropdown in header
- Progression: Select currency → All prices convert → Select language → Interface translates → Book in preferred currency → Pay in local currency
- Success criteria: 5+ currencies supported, 3+ languages, accurate real-time conversion

### **Smart Recommendations Engine**
- Functionality: AI-powered property recommendations based on browsing history, preferences, past bookings
- Purpose: Help users discover properties they'll love
- Trigger: View homepage, property detail pages, or search results
- Progression: Browse properties → AI analyzes behavior → Recommendations appear → Click suggested property → Find perfect match → Book
- Success criteria: Recommendations relevant, improve click-through rate, update in real-time

## Edge Case Handling

- **No Availability**: Show similar properties with open dates, offer date flexibility suggestions
- **Price Changes**: Lock price for 15 minutes after viewing, notify if price increases during checkout
- **Cancellations**: Automated refund processing based on policy, notify both parties, update calendar
- **Disputes**: Provide resolution center with mediation, evidence upload, admin intervention
- **Payment Failures**: Retry logic, alternative payment methods, hold booking for 30 minutes
- **Property Deactivated**: Notify guests with bookings, offer alternatives, automatic refunds
- **Host Non-Response**: Escalate to admin after 24 hours, auto-approve if instant book enabled
- **Overbooking**: Compensate guest, find alternative accommodation, cover price difference

## Design Direction

The design should feel **professional, trustworthy, and aspirational** - combining Booking.com's reliability, Airbnb's warmth, and Trivago's clarity. Users should feel confident in their booking decisions while being inspired by beautiful imagery and personalized recommendations.

## Color Selection

- **Primary Color**: Rich teal `oklch(0.65 0.15 195)` - Trustworthy, professional, reminiscent of tropical waters (Booking.com trust)
- **Secondary Color**: Warm coral `oklch(0.70 0.18 25)` - Energetic, inviting, creates urgency for deals (Airbnb warmth)
- **Accent Color**: Vibrant orange `oklch(0.75 0.20 45)` - Highlights deals, CTAs, important information (Trivago smart highlights)
- **Success**: Emerald green `oklch(0.65 0.18 155)` - Confirmations, availability, verified badges
- **Background**: Clean white `oklch(0.98 0 0)` - Maximum clarity and content focus
- **Foreground**: Deep charcoal `oklch(0.25 0.01 240)` - Excellent readability

### Foreground/Background Pairings:
- Primary on White: `oklch(0.25 0.01 240)` on `oklch(0.98 0 0)` - Ratio 13.8:1 ✓
- Accent on White: `oklch(0.75 0.20 45)` on `oklch(0.98 0 0)` - Ratio 4.9:1 ✓
- White on Primary: `oklch(0.98 0 0)` on `oklch(0.65 0.15 195)` - Ratio 5.2:1 ✓

## Font Selection

Typography should convey **trust, clarity, and modern sophistication** with excellent readability across all device sizes.

- **Display Font**: Outfit (Google Fonts) - Clean, modern, geometric sans-serif for headings and hero text
- **Body Font**: Inter (Google Fonts) - Highly legible, professional, designed for UI

### Typographic Hierarchy:
- H1 (Hero Headlines): Outfit Bold/48px/tight tracking/-0.02em
- H2 (Section Titles): Outfit SemiBold/32px/normal tracking
- H3 (Card Titles): Outfit Medium/24px/normal tracking
- H4 (Property Names): Outfit Medium/20px/normal tracking
- Body (Main Content): Inter Regular/16px/1.6 line-height
- Small (Metadata): Inter Regular/14px/1.5 line-height
- Caption (Labels): Inter Medium/12px/1.4 line-height/uppercase/letter-spacing

## Animations

Animations should be **purposeful and performance-optimized**, enhancing usability without distracting users:
- **Micro-interactions**: Button hover states (scale 1.02, 200ms ease-out), favorite heart animation (bounce on save)
- **Loading States**: Skeleton screens for property cards, smooth image loading with blur-up effect
- **Transitions**: Page transitions (slide + fade, 300ms), modal entrances (scale + fade, 250ms)
- **Feedback**: Success checkmark animation (draw stroke, 400ms), price drop pulse (glow effect, 1s)
- **Scroll**: Parallax on hero images (subtle depth), lazy-load images as they enter viewport

## Component Selection

### Shadcn Components:
- **Calendar**: Date range picker for booking dates with availability overlay
- **Dialog**: Property details quick view, booking confirmation, host contact
- **Card**: Property listings, experience cards, deal highlights
- **Tabs**: Property details sections (overview, amenities, reviews, location)
- **Select**: Filters (price range, property type, amenities)
- **Badge**: Superhost, Verified, Instant Book, Best Deal labels
- **Avatar**: Host profile images with verified badge overlay
- **Carousel**: Property image galleries with thumbnail navigation
- **Popover**: Date picker, guest counter, quick filters
- **Sheet**: Mobile filter panel, booking drawer
- **Separator**: Content sections, card dividers
- **Toast**: Booking confirmations, error messages, price alerts
- **Slider**: Price range filter, guest count selector

### Custom Components:
- **PriceComparisonChart**: Line chart showing price history over time (D3.js)
- **AvailabilityCalendar**: Monthly calendar with color-coded availability
- **PropertyImageGallery**: Full-screen gallery with zoom, 360° tours
- **HostProfileCard**: Comprehensive host info with stats and verification
- **DealCountdown**: Timer for flash sales and limited offers
- **MessageThread**: Chat interface with real-time updates
- **WishlistManager**: Grid view of saved properties with drag-to-organize
- **FilterPanel**: Advanced multi-select filters with live result counts
- **BookingSummary**: Sticky booking card with price breakdown
- **ReviewsSection**: Paginated reviews with rating breakdown charts

### States:
- **Buttons**: Default, hover (lift + shadow), active (pressed), disabled (muted), loading (spinner)
- **Property Cards**: Default, hover (shadow + info overlay), wishlisted (filled heart), booked (success badge)
- **Filters**: Unchecked, checked (accent color), indeterminate, disabled
- **Availability**: Available (success green), limited (warning orange), unavailable (muted gray)

### Icon Selection:
- **Navigation**: House, MagnifyingGlass, Heart, User, Gear from @phosphor-icons/react
- **Actions**: CalendarBlank, Share, MapPin, Star, ChatCircle, Bell
- **Amenities**: WifiHigh, Car, Coffee, Bathtub, Snowflake, Dog
- **Payment**: CreditCard, ShieldCheck, Lock, Bank
- **Status**: CheckCircle, XCircle, Warning, Info, Clock

### Spacing:
- Container padding: px-4 sm:px-6 lg:px-8
- Section spacing: py-12 md:py-16 lg:py-24
- Card padding: p-4 md:p-6
- Element gaps: gap-2 (8px), gap-4 (16px), gap-6 (24px), gap-8 (32px)
- Border radius: rounded-lg (12px) for cards, rounded-xl (16px) for modals

### Mobile Responsiveness:
- **Grid Layouts**: 1 column mobile, 2 tablet, 3-4 desktop for property cards
- **Navigation**: Hamburger menu mobile, full nav desktop with sticky behavior
- **Filters**: Bottom sheet mobile, side panel desktop
- **Property Gallery**: Swipe gestures mobile, thumbnail nav desktop
- **Booking Card**: Sticky bottom mobile, sidebar desktop
- **Search**: Full-screen modal mobile, inline dropdown desktop
