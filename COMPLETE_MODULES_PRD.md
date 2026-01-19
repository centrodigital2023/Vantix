# PRD: Complete Intelligent Modules for Vantix Tourism Platform

Multi-role authentication and management system for hosts, service providers, and administrators with intelligent features and robust security.

**Experience Qualities**:
1. **Secure and Trustworthy** - Multi-layer authentication with 2FA for admin, verification workflows for providers
2. **Intelligently Guided** - AI-powered recommendations, smart form validation, and contextual assistance throughout
3. **Professionally Robust** - Enterprise-grade panel management with real-time analytics and comprehensive controls

**Complexity Level**: Complex Application (advanced functionality with multiple views, roles, and verification workflows)
- This system manages three distinct user types with different permission levels, verification states, and dashboards requiring sophisticated state management and security protocols.

## Essential Features

### Feature 1: Host/Provider Authentication System
- **Functionality**: Dual-mode authentication for hosts (accommodations) and service providers (tours, transport, activities)
- **Purpose**: Enable business owners to manage their tourism offerings while maintaining platform quality through verification
- **Trigger**: User clicks "Anfitriones/Prestadores" in navigation or directly accesses host-auth page
- **Progression**: Select role (Host/Provider) → Login/Signup tabs → Enter credentials → Verification pending state → Admin approval → Access granted → Navigate to panel
- **Success criteria**: Users can register, receive verification notice, and access appropriate panel upon approval

### Feature 2: Service Provider Registration Wizard
- **Functionality**: Multi-step intelligent form with AI-assisted descriptions, photo analysis, and draft auto-save
- **Purpose**: Streamline onboarding of tourism service providers with high-quality, complete listings
- **Trigger**: Service provider clicks "Registrar Servicio" from their panel or navigation
- **Progression**: Type selection → Basic info with AI optimizer → Location → Service details & specialties → Photo upload with AI tags → Pricing model → Review summary → Submit for approval
- **Success criteria**: Complete service registration saved, pending admin approval, provider receives confirmation

### Feature 3: Provider Management Panel
- **Functionality**: Dashboard for hosts/providers to manage services, view bookings, track revenue, and receive AI recommendations
- **Purpose**: Centralize business operations and provide actionable insights to maximize bookings
- **Trigger**: Authenticated provider navigates to panel
- **Progression**: View dashboard metrics → Check pending bookings → Review AI recommendations → Manage active services → Update availability → Respond to reviews
- **Success criteria**: Providers can monitor all business metrics and manage services efficiently

### Feature 4: SuperAdmin Authentication (2FA)
- **Functionality**: High-security admin access with mandatory two-factor authentication and attempt limiting
- **Purpose**: Protect platform administration from unauthorized access
- **Trigger**: Admin user accesses admin-auth page
- **Progression**: Enter admin credentials → Validate → Receive 2FA code → Enter 6-digit code → System verifies → Grant access to SuperAdmin dashboard
- **Success criteria**: Only valid admins with correct 2FA codes access admin panel, failed attempts logged and blocked

### Feature 5: SuperAdmin Dashboard & Controls
- **Functionality**: Comprehensive platform oversight with provider verification, complaint management, analytics, and system configuration
- **Purpose**: Enable platform administrators to maintain quality, resolve issues, and optimize operations
- **Trigger**: Authenticated SuperAdmin accesses dashboard
- **Progression**: View system metrics → Navigate to specific module (Users/Providers/Complaints/Analytics/Config) → Perform admin actions → Review audit logs → Monitor system health
- **Success criteria**: Admins can verify providers, manage complaints, view analytics, and configure platform settings

## Edge Case Handling

- **Duplicate Registrations**: Check email uniqueness, show "account exists" message with password reset option
- **Incomplete Registrations**: Auto-save drafts every second, restore on return with "Continue where you left off" prompt
- **Invalid Photos**: AI detects quality issues (blur, low res, inappropriate), suggests retake or upload alternatives
- **Failed 2FA**: Limit to 3 attempts, temporary lockout (5 min), log security event, notify admin
- **Expired Sessions**: Auto-logout after 30min inactivity for providers, 15min for admins, show re-auth modal
- **Network Failures**: Offline detection, queue actions locally, sync when reconnected, show status indicator
- **Verification Delays**: Show expected timeline (24-48h), email notifications on status changes, admin priority queue
- **Conflicting Edits**: Detect concurrent modifications, show diff view, allow manual merge or revert

## Design Direction

The design should evoke **professional confidence meets modern sophistication** - trustworthy enough for business operations while feeling innovative and intelligent. Color scheme balances authority (deep purples/blues) with warmth (accent corals/oranges). Interfaces should feel like premium B2B SaaS tools: clean, data-dense without clutter, with delightful micro-interactions that make complex tasks feel effortless.

## Color Selection

Building on existing Vantix theme with role-specific accents:

- **Primary Color (Deep Violet)**: `oklch(0.65 0.25 285)` - Main brand, provider actions, trust signals. Communicates innovation and premium service.
- **Secondary Colors**: 
  - Teal `oklch(0.55 0.22 195)` - Host/Provider role indicators, success states
  - Warm Orange `oklch(0.70 0.28 330)` - Admin role, urgent actions, alerts
- **Accent Color (Coral Pink)**: `oklch(0.70 0.28 330)` - CTAs, important notifications, highlights requiring attention
- **Foreground/Background Pairings**:
  - Background (Dark Navy `oklch(0.12 0.02 265)`): Foreground White `oklch(0.95 0.01 265)` - Ratio 11.2:1 ✓
  - Card (Slate `oklch(0.16 0.025 265)`): Foreground White `oklch(0.95 0.01 265)` - Ratio 9.8:1 ✓
  - Primary (Deep Violet `oklch(0.65 0.25 285)`): White text `oklch(0.98 0.005 285)` - Ratio 5.2:1 ✓
  - Accent (Coral `oklch(0.70 0.28 330)`): White text `oklch(0.98 0.005 330)` - Ratio 4.9:1 ✓
  - Destructive (Red `oklch(0.58 0.24 25)`): White text `oklch(0.98 0.005 0)` - Ratio 5.8:1 ✓

## Font Selection

Professional yet approachable typography that works for data-heavy interfaces:

**Primary**: Inter for UI (excellent readability at small sizes, neutral personality)
**Display**: Outfit for headers (friendly rounded geometric, modern)
**Accent**: Space Grotesk for statistics and important numbers (distinctive character)

- **Typographic Hierarchy**:
  - H1 (Dashboard Title): Outfit Bold/32px/tight leading/-0.02em tracking
  - H2 (Section Headers): Outfit SemiBold/24px/tight leading/-0.015em tracking
  - H3 (Card Titles): Outfit SemiBold/18px/normal leading
  - Body (Interface Text): Inter Regular/14px/relaxed leading (1.6)
  - Stats (Metrics): Space Grotesk Bold/36px/tight leading/tabular-nums
  - Small (Helper Text): Inter Regular/12px/relaxed leading
  - Button Text: Inter SemiBold/15px/normal leading

## Animations

Animations balance professionalism with delight - purposeful, physics-based, never blocking workflows:

**Micro-interactions**: Button states (100ms cubic-bezier), hover lifts (200ms ease-out), input focus rings (150ms)
**State Changes**: Tab transitions (250ms ease), loading skeletons (shimmer 1.5s), success checkmarks (bounce-in 400ms)
**Page Transitions**: Dashboard mount (staggered fade-up 300ms), panel switches (slide 350ms ease-in-out)
**Feedback**: Toast notifications (slide-in 200ms spring), validation errors (shake 400ms), progress indicators (smooth width transitions)
**Intelligent moments**: AI suggestion appear (glow pulse 2s), metric updates (count-up animation 800ms), verification status changes (status badge morph 300ms)

## Component Selection

- **Components**:
  - `Card` - All dashboard panels, stat containers, service listings (add shadow-lg on hover)
  - `Tabs` - Login/Signup switch, dashboard sub-sections (style with underline indicator)
  - `Button` - Primary actions (gradient primary→accent), secondary (outline), destructive (red for blocks/deletions)
  - `Input` / `Textarea` - All form fields (focus:ring-2 ring-primary with 200ms transition)
  - `Select` - Dropdowns for countries, service types, time ranges (custom caret icon)
  - `Checkbox` / `RadioGroup` - Service specialties, role selection (large 24px custom designs)
  - `Badge` - Status indicators (verified/pending/blocked with appropriate colors)
  - `Alert` - Security notices, verification timelines (variant with icons)
  - `Dialog` - Confirmation modals, 2FA input, image previews
  - `Progress` - Multi-step wizard indicator, upload progress
  - `Table` - Admin user lists, booking history, complaint tracking
  - `Separator` - Section dividers in dashboards
  - `Skeleton` - Loading states for stats and lists
  - `Toast` (Sonner) - All feedback messages (success/error/info)
  
- **Customizations**:
  - Custom `StatsCard` component with icon, value, trend indicator, and click handler
  - Custom `VerificationBadge` component with animated state transitions
  - Custom `MetricCounter` with count-up animation
  - Custom `AIRecommendationCard` with sparkle icon and gradient border
  - Custom `SecurityAlert` component for admin warnings
  
- **States**:
  - Buttons: default/hover (lift shadow)/active (scale 0.98)/disabled (opacity 40%)
  - Inputs: default/focus (ring-2)/error (ring-destructive)/success (ring-success)
  - Cards: default/hover (shadow increase)/selected (ring-2 ring-primary)
  - Badges: pending (yellow)/verified (green)/blocked (red)/processing (blue with pulse)
  
- **Icon Selection** (Phosphor Icons):
  - Auth: `SignIn`, `UserPlus`, `Eye`, `EyeSlash`, `ShieldCheck`, `LockKey`
  - Provider: `House`, `Van`, `MapTrifold`, `Coffee`, `CalendarBlank`
  - Admin: `ShieldWarning`, `Users`, `Buildings`, `ChartLine`, `Warning`
  - Actions: `Plus`, `ArrowLeft`, `ArrowRight`, `CheckCircle`, `Sparkle`
  - Metrics: `CurrencyDollar`, `TrendUp`, `Star`, `Bell`
  
- **Spacing**: 
  - Form fields: mb-4 (16px) between inputs
  - Sections: mb-8 (32px) between major sections
  - Card padding: p-6 (24px) standard, p-8 (32px) for main content areas
  - Grid gaps: gap-4 (16px) for form grids, gap-6 (24px) for dashboard cards
  
- **Mobile**:
  - Stack all dashboard metrics vertically on <768px
  - Full-width forms with single-column layouts
  - Collapsible admin sidebar into drawer
  - Touch-friendly 44px minimum tap targets
  - Simplified stat cards showing only key metric
  - Hide secondary actions in overflow menu
  - Bottom navigation for key provider panel sections
