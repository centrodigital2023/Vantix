# Enhanced Favorites System for VANTIX Travel Platform

A comprehensive favorites management system that enables users to save, track, compare, and share their preferred accommodations with intelligent price monitoring and social sharing capabilities.

**Experience Qualities**: 
1. **Informative** - Cards reveal complete accommodation details without leaving the favorites view, reducing friction in the decision-making process
2. **Proactive** - Smart notifications alert users to price changes and discounts, helping them make timely booking decisions
3. **Social** - Seamless sharing to WhatsApp and social media enables collaborative trip planning with friends and family

**Complexity Level**: Light Application (multiple features with basic state)
This is a feature-rich enhancement to an existing travel platform that adds price monitoring, detailed views, comparison tools, and social sharing without requiring backend infrastructure or complex user flows.

## Essential Features

### Expandable Favorite Cards
- **Functionality**: Cards expand in-place to reveal complete accommodation information including all photos, amenities, room types, pricing details, and policies
- **Purpose**: Eliminates navigation overhead, allowing users to review all details without losing their place in the favorites collection
- **Trigger**: Click on card or dedicated "View Details" button
- **Progression**: User clicks card → Card smoothly expands with animation → Full details displayed inline → User can collapse or expand next card
- **Success criteria**: Cards expand smoothly within 300ms, display all accommodation data, and collapse cleanly without layout shifts

### Price Change Notifications
- **Functionality**: Monitors favorite accommodations for price decreases and new discounts, displaying badge notifications and toast alerts
- **Purpose**: Helps users identify optimal booking times and capitalizes on deals for places they're interested in
- **Trigger**: Automatic price check on app load, manual refresh, or simulated price updates
- **Progression**: Price detected → Comparison with stored price → Notification badge appears → User clicks notification center → Views price change details with CTA
- **Success criteria**: Price changes detected reliably, notifications persist until viewed, clear indication of savings amount

### Social Share Functionality
- **Functionality**: Generate shareable links for WhatsApp, Facebook, Twitter, and copy-to-clipboard with formatted accommodation details
- **Purpose**: Enables collaborative travel planning and recommendation sharing with friends and family
- **Trigger**: Click share button on any favorite card
- **Progression**: User clicks share → Share menu appears → Selects platform → Pre-formatted message with link opens in new window/app
- **Success criteria**: Share menu appears instantly, messages are properly formatted with accommodation name, price, and link

### Visual Comparator
- **Functionality**: Side-by-side comparison view displaying up to 3 favorites with key attributes (price, rating, amenities, location) in aligned columns
- **Purpose**: Facilitates decision-making by highlighting differences between accommodation options
- **Trigger**: Click "Compare" button in favorites toolbar after selecting 2-3 favorites
- **Progression**: User selects favorites via checkbox → Clicks compare button → Comparison view slides in → Attributes displayed in aligned grid → User can remove items or close comparison
- **Success criteria**: Comparison loads in under 500ms, attributes are visually aligned, differences are easily scannable

## Edge Case Handling

- **Empty Favorites** - Display compelling empty state with visual prompt to explore accommodations
- **Single Item Selected for Compare** - Disable compare button with tooltip explaining minimum 2 items required
- **More Than 3 Items Selected** - Lock selection at 3 with visual feedback and message
- **Missing Accommodation Data** - Show "Information unavailable" for missing fields rather than breaking layout
- **Share on Mobile** - Use native share API when available, fallback to copy link
- **Network Errors** - Cache last known prices, show stale data indicator if refresh fails
- **Rapid Price Changes** - Debounce notifications to avoid spam, batch multiple changes

## Design Direction

The design should feel **intelligent, organized, and trustworthy** - like a premium travel concierge service. The interface should communicate sophistication through generous spacing, purposeful animations, and a color palette that evokes both reliability and excitement for travel. Visual feedback should be immediate and satisfying, with smooth transitions that maintain spatial context.

## Color Selection

The color scheme balances the existing VANTIX dark theme with vibrant accents that draw attention to important notifications and actions.

- **Primary Color**: `oklch(0.65 0.25 285)` - Deep purple conveys premium quality and trust, used for primary actions
- **Secondary Colors**: `oklch(0.55 0.22 195)` - Teal for secondary actions, `oklch(0.20 0.02 265)` - Rich dark blue for cards and surfaces
- **Accent Color**: `oklch(0.70 0.28 330)` - Vibrant pink-magenta for notifications, price drops, and attention-grabbing CTAs
- **Success Color**: `oklch(0.62 0.20 155)` - Fresh green for positive price changes and confirmations
- **Warning Color**: `oklch(0.68 0.18 45)` - Warm amber for price increases

**Foreground/Background Pairings**:
- Background `oklch(0.12 0.02 265)`: Foreground `oklch(0.95 0.01 265)` - Ratio 14.2:1 ✓
- Card `oklch(0.16 0.025 265)`: Foreground `oklch(0.95 0.01 265)` - Ratio 13.1:1 ✓
- Accent `oklch(0.70 0.28 330)`: White `oklch(0.98 0.005 330)` - Ratio 6.8:1 ✓
- Primary `oklch(0.65 0.25 285)`: White `oklch(0.98 0.005 285)` - Ratio 5.2:1 ✓

## Font Selection

Typefaces should feel modern and highly legible while conveying the technical sophistication of the platform.

**Primary**: Space Grotesk (700) for headlines - geometric and distinctive with strong personality
**Body**: Inter (400, 500, 600) for UI elements and body text - excellent screen legibility
**Accent**: Outfit (600, 700) for subheadings - friendly and approachable
**Monospace**: JetBrains Mono for prices and data - precise and technical

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold/32px/-0.03em letter spacing
  - H2 (Section Headers): Outfit SemiBold/24px/-0.02em letter spacing
  - H3 (Card Titles): Outfit SemiBold/18px/-0.01em letter spacing
  - Body: Inter Regular/15px/1.6 line height
  - Price Display: JetBrains Mono Medium/24px/tabular numbers
  - Labels: Inter Medium/13px/uppercase with tracking

## Animations

Animations should feel snappy and purposeful, emphasizing spatial relationships and state changes without delays.

- **Card Expansion**: 400ms ease-out with scale and opacity, maintaining card position in grid
- **Notification Badges**: Bounce-in on appearance (0.4s cubic-bezier), gentle pulse every 3s to draw attention
- **Share Menu**: Slide up from button with 250ms ease-out, staggered item fade-in
- **Comparison Panel**: Slide in from right 350ms ease-out, items fade in sequentially (50ms delay each)
- **Price Change Highlight**: Brief color flash (success/warning) followed by 2s fade to normal
- **Hover States**: 200ms ease transitions for all interactive elements
- **Loading States**: Subtle shimmer effect for data fetch, skeleton screens for comparison panel

## Component Selection

- **Components**: 
  - Cards (expandable with Collapsible from Radix) - main favorite item display
  - Badge - notification indicators for price changes
  - Dialog - full-screen comparison view
  - Popover - share menu dropdown
  - Button - primary actions (compare, share, expand)
  - Checkbox - multi-select for comparison
  - Sheet - mobile-optimized comparison panel
  - Separator - visual dividers in comparison grid
  - Tooltip - helpful hints for disabled states
  - Alert - prominent price change announcements
  - Skeleton - loading placeholders

- **Customizations**: 
  - Animated expansion wrapper for cards using framer-motion
  - Custom notification center with badge counter in navbar
  - Share menu with platform-specific icons from phosphor-icons
  - Comparison grid using CSS Grid with fixed column layout
  - Sticky comparison toolbar that follows scroll

- **States**: 
  - Buttons: Distinct hover (scale 1.02), active (scale 0.98), disabled (opacity 0.5)
  - Cards: Default border (subtle), hover (elevated shadow + border glow), expanded (elevated + wider)
  - Checkboxes: Empty, checked (primary color), indeterminate (for partial selections)
  - Share icons: Default, hover (color + scale 1.1), active (pressed animation)
  - Notification badge: Idle, pulsing (new notifications), dismissed (fade out)

- **Icon Selection**:
  - Heart (fill/regular) - favorite toggle
  - Bell (fill/regular) - notification center
  - ShareNetwork - main share action
  - WhatsAppLogo, FacebookLogo, TwitterLogo, Link - specific platforms
  - ChartLineUp/ChartLineDown - price changes
  - Scales - comparison feature
  - CaretDown/CaretUp - expand/collapse
  - X - close/remove actions
  - Check - selection confirmations

- **Spacing**: 
  - Card padding: 1.5rem (24px)
  - Grid gap: 1.5rem (24px)
  - Section spacing: 3rem (48px)
  - Inline element gaps: 0.5rem (8px)
  - Button padding: 0.75rem 1.5rem (12px 24px)

- **Mobile**: 
  - Cards stack vertically with full width
  - Expanded cards go full-screen on mobile using Sheet component
  - Comparison view uses Sheet instead of Dialog for better mobile UX
  - Share menu uses native mobile share API when available
  - Grid switches from 3 columns → 2 columns (tablet) → 1 column (mobile)
  - Notification center accessible via fixed bottom nav on mobile
  - Comparison limited to 2 items on small screens for better readability
