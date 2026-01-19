# PRD: Complete Intelligent Modules for Vantix Tourism Platform

**Experience Qualities**:

**Experience Qualities**:
1. **Secure and Trustworthy** - Multi-layer authentication with 2FA for admin, verification workflows for providers
2. **Intelligently Guided** - AI-powered recommendations, smart form validation, and contextual assistance throughout
3. **Professionally Robust** - Enterprise-grade panel management with real-time analytics and comprehensive controls

**Complexity Level**: Complex Application (advanced functionality with multiple views, roles, and verification workflows)
- This system manages three distinct user types with different permission levels, verification states, and dashboards requiring sophisticated state management and security protocols.

- **Progression**: Se

### Feature 2: Service Provider Registration Wizar
- **Functionality**: Dual-mode authentication for hosts (accommodations) and service providers (tours, transport, activities)
- **Purpose**: Enable business owners to manage their tourism offerings while maintaining platform quality through verification
- **Trigger**: User clicks "Anfitriones/Prestadores" in navigation or directly accesses host-auth page
- **Functionality**: High-security admin access with mandatory two-factor authentication and attempt limiting
- **Trigger**: Admin user accesses admin-auth page

### Feature 5: SuperAdmin Dashboard & Controls
- **Purpose**: Enable platform administrators to maintain quality, resolve issues, and optimize operations
- **Progression**: View system metrics → Navigate to specific module (Users/Providers/Complaints/Analy


- **Incomplete Registrations**: Auto-save drafts every second, restore on return with "Continue where you left off"

- **Network Failures**: Offline detectio
- **Conflicting Edits**: Detect concurrent modifications, show diff view, allow manual merge or revert
## Design Direction
The design should evoke **professional confidence meets 
## Color Selection
Building on existing Vantix theme with role-specific accents:

  - Teal `oklch(0.55 0.22 195)` - Host/Provide
- **Accent Color (Coral Pink)**: `oklch(0.70 0.28 330)` - CTAs, important notifications, highlights requiring
  - Background (Dark Navy `oklch(0.12 0.02 265)`): Foreground White `ok
  - Primary (Deep Violet `oklch(0.65 0.25 285)`): 
  - Destructive (Red `oklch(0.58 0.24 25)`): White text `oklch(0.98 0.005 0)` - Ratio 5.8:1 ✓
## Font Selection

**Primary**: Inter for UI (excellent readabili
**Accent**: Space Grotesk for statistics and important numbers (distinctive character)
- **Typographic Hierarchy**:
  - H2 (Section Headers): Outfit SemiBold/24px/tight leadi
  - Body (Interface Text): Inter Regular/14px/relaxed leading (1.6)
  - Small (Helper Text): Inter Regular/12px/relaxed leading



**State Changes**: Tab transitions (250ms ease), loading skeletons (shimmer 1.5s), success checkmarks (bounce-i
**Feedback**: Toast notifications (slide-in 200ms spring), validation errors (shake 400ms), progress indicators (smooth wi


  - `Card` - All dashboard panels, stat containers, service listings (add shadow-lg on hover)
  - `Button` - Primary actions (gradient primary→accent), secondary (outline), destructive (red for blocks/del
  - `Select` - Dropdowns for countries, service types, time ranges (custom caret icon)
  - `Badge` - Status indicators (verified/pending/blocked with appropriate colors)

  - `Table` - Admin

  

  - Custom `Metric

- **States**:

  - Badges: pending (yellow)/verified (green)/blocked (red)/processing (blue with pulse)
- **Icon Selection** (Ph
  - Provider: `House`, `Van`, `MapTrifold`, `Coffee`, `CalendarBlank`
  - Actions: `Plus`, `ArrowLeft`, `ArrowRight`, `CheckCircle`, `Sparkle`
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



































