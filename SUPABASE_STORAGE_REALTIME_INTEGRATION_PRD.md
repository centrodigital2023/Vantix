# Supabase Storage & Realtime Integration PRD

Implementation of Supabase Storage bucket configuration for real image uploads and realtime synchronization for specific tables.

## Purpose

Configure and enable Supabase Storage for actual image uploads in the accommodation registration system, and implement realtime updates across specified database tables for live data synchronization.

**Experience Qualities**:
1. **Seamless** - Image uploads should feel instant and reliable with clear progress feedback
2. **Synchronized** - Data updates across tables should appear immediately without manual refresh
3. **Professional** - Visual feedback and error handling should be clear and reassuring

**Complexity Level**: Light Application (multiple features with basic state)

## Essential Features

### Feature 1: Storage Bucket Configuration & Testing
- **Functionality**: Configure Supabase Storage bucket and test real image uploads
- **Purpose**: Enable actual file storage instead of mock data
- **Trigger**: User uploads images in accommodation registration
- **Progression**: File selection → validation → upload progress → completion → URL generation
- **Success criteria**: Images successfully upload and return public URLs

### Feature 2: Realtime Table Synchronization
- **Functionality**: Enable realtime updates on accommodations and bookings tables
- **Purpose**: Keep data synchronized across all connected clients
- **Trigger**: Database insert/update/delete operations
- **Progression**: Database change → realtime event → hook captures → UI updates → toast notification
- **Success criteria**: Changes appear instantly without page refresh

### Feature 3: Image Upload Integration in Registration Form
- **Functionality**: Full integration of image upload system in accommodation wizard
- **Purpose**: Allow hosts to upload actual property photos during registration
- **Trigger**: User reaches photos step in registration wizard
- **Progression**: Drag/drop files → validation → upload with progress → preview → continue
- **Success criteria**: Multiple images upload successfully and save with accommodation

## Edge Case Handling

- **Large files**: Size validation prevents uploads over 10MB, shows clear error
- **Wrong formats**: File type validation catches non-image files
- **Upload failures**: Retry mechanism and clear error messages
- **Network issues**: Timeout handling with user feedback
- **Missing configuration**: Clear prompts to configure Supabase credentials
- **Storage bucket not created**: Instructions to create bucket in Supabase dashboard

## Design Direction

Professional, modern interface that inspires confidence. Upload progress should be visually satisfying with smooth animations. Realtime updates should be subtle but noticeable.

## Color Selection

- **Primary Color**: oklch(0.65 0.20 160) - Teal green communicates growth and reliability
- **Secondary Colors**: oklch(0.92 0.08 200) - Light blue for supporting elements
- **Accent Color**: oklch(0.75 0.15 280) - Purple for upload progress and success states
- **Foreground/Background Pairings**: 
  - Primary (Teal): White text (#FFFFFF) - Ratio 4.9:1 ✓
  - Accent (Purple): White text (#FFFFFF) - Ratio 5.2:1 ✓

## Font Selection

Inter for UI elements with clear hierarchy. Upload states use medium weight (500) for emphasis, progress indicators use mono for consistency.

- **Typographic Hierarchy**: 
  - H2 (Section Headers): Inter Bold/24px/tight spacing
  - Body (Instructions): Inter Regular/16px/relaxed line-height
  - Labels: Inter Medium/14px/normal spacing
  - Progress Text: JetBrains Mono Regular/13px/tight tracking

## Animations

Smooth upload progress animations with elastic easing. Realtime update notifications slide in gently from top-right. Image previews fade in after upload completion.

## Component Selection

- **Components**: 
  - Card for upload zones
  - Progress bars for upload status
  - Badge for file type indicators
  - Alert for storage configuration prompts
  - Toast (sonner) for realtime update notifications
- **Customizations**: 
  - Custom drag-and-drop upload zone with dashed borders
  - Animated progress bars with gradient fills
  - Image preview grid with hover effects
- **States**: Upload button disabled during upload, loading spinner on progress, success checkmark on complete
- **Icon Selection**: UploadSimple, Images, CheckCircle, Warning, CloudArrowUp from Phosphor
- **Spacing**: 4-space gap between upload items, 6-space padding in upload zones
- **Mobile**: Single column upload preview grid, full-width upload zone, stacked progress bars
