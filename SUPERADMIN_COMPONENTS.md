# SuperAdmin Components Directory

This document provides a reference guide for all SuperAdmin components and their usage.

---

## 📂 Component Structure

```
src/
├── components/
│   └── superadmin/
│       └── SuperAdminHeader.tsx         # Reusable header with navigation
└── pages/
    └── superadmin/
        ├── SuperAdminDashboard.tsx      # Main dashboard with metrics
        ├── SuperAdminUsers.tsx          # User management
        ├── SuperAdminProviders.tsx      # Provider control
        ├── SuperAdminModeration.tsx     # AI content moderation (NEW)
        ├── SuperAdminBookings.tsx       # Booking management (NEW)
        ├── SuperAdminComplaints.tsx     # Complaint center
        ├── SuperAdminAnalytics.tsx      # Global analytics
        ├── SuperAdminConfig.tsx         # System configuration
        └── index.ts                     # Module exports
```

---

## 🧩 Shared Components

### SuperAdminHeader
**Location:** `src/components/superadmin/SuperAdminHeader.tsx`

```typescript
interface SuperAdminHeaderProps {
  onNavigate: (page: string) => void
  title: string
  subtitle?: string
  showAlerts?: boolean
  alertCount?: number
}
```

**Usage:**
```tsx
<SuperAdminHeader
  title="Gestión de Reservas"
  subtitle="Administra reservas, disputas y reembolsos"
  onNavigate={onNavigate}
  showAlerts
  alertCount={5}
/>
```

**Features:**
- Back to dashboard button
- Page title and subtitle
- Optional alert notifications
- User profile badge
- Logout button

---

## 📄 Page Components

### 1. SuperAdminDashboard

**Route:** `/superadmin-dashboard`

**Key Features:**
- 8 metric cards (clickable navigation)
- Revenue by country visualization
- Quick actions menu
- Filter by country and time range
- System status indicator

**Data Required:**
```typescript
interface SuperAdminStats {
  activeUsers: number
  activeHosts: number
  blockedHosts: number
  publishedServices: number
  totalBookings: number
  revenueByCountry: Record<string, number>
  openComplaints: number
  securityAlerts: number
  systemStatus: 'operational' | 'degraded' | 'down'
}
```

---

### 2. SuperAdminUsers

**Route:** `/superadmin-users`

**Key Features:**
- Search by name/email
- Filter by role, status, country
- User detail modal
- Change role (tourist/host/admin/superadmin)
- Change status (active/suspended/blocked)
- Trust score display

**Actions:**
- View user details
- Edit profile
- Change role
- Suspend/block user
- View login history

---

### 3. SuperAdminProviders

**Route:** `/superadmin-providers`

**Key Features:**
- Tabs: Pending/Active/Suspended/Rejected
- AI scoring system (legal/reputation/risk)
- Document verification (RNT, insurance)
- Provider detail view
- Approval/rejection workflow

**AI Analysis:**
- Legal compliance score
- Reputation score
- Risk assessment
- Automated recommendations

---

### 4. SuperAdminModeration (NEW)

**Route:** `/superadmin-moderation`

**Key Features:**
- **AI-powered content analysis**
- Tabs: Pending/Approved/Rejected/All
- Filter by type and priority
- Content detail view with images
- AI score (0-100) and flags
- Re-analyze with AI
- Moderation notes

**Content Types:**
- Accommodations
- Services
- Reviews
- Profiles
- Images

**AI Capabilities:**
```typescript
// Automatic analysis
- Fraud detection
- Fake images/stock photos
- Extreme language
- Exaggerated claims
- Spam patterns
```

**Workflow:**
```
1. Content submitted
2. AI analyzes automatically
3. Flags suspicious content
4. Admin reviews
5. Approve/reject with notes
6. Audit log created
```

---

### 5. SuperAdminBookings (NEW)

**Route:** `/superadmin-bookings`

**Key Features:**
- **Complete booking management**
- Tabs: All/Confirmed/Disputed/Completed/Cancelled
- Filter by status and payment status
- Booking detail modal
- **Dispute intervention**
- **Force cancellation** (with 2FA)
- **Refund processing** (with validation)

**Critical Actions:**
1. **Cancel Booking:**
   - Requires cancellation reason
   - Requires password authorization
   - Irreversible action
   - Auto-notification sent

2. **Process Refund:**
   - Requires refund amount (validated)
   - Requires refund reason
   - Requires password authorization
   - Immediate execution
   - Full traceability

**Security:**
```typescript
// All destructive actions require:
- Detailed reason/notes
- Password: 'admin123' (simulates 2FA)
- Double confirmation
- Audit log entry
```

---

### 6. SuperAdminComplaints

**Route:** `/superadmin-complaints`

**Key Features:**
- AI classification
- Priority system (low/medium/high/critical)
- Assignment to agents
- AI-generated response suggestions
- Resolution workflow
- Satisfaction tracking

**AI Features:**
- Auto-classification by category
- Priority assessment
- Response generation
- Risk pattern detection

---

### 7. SuperAdminAnalytics

**Route:** `/superadmin-analytics`

**Key Features:**
- Global metrics dashboard
- Country comparisons
- Temporal trends
- Visual charts (recharts)
- Export capabilities (planned)

**Metrics:**
- User growth
- Revenue trends
- Booking patterns
- Geographic distribution
- Performance indicators

---

### 8. SuperAdminConfig

**Route:** `/superadmin-config`

**Key Features:**
- Country configuration
- Commission rates
- Cancellation policies
- Service categories
- Notification settings
- System parameters

**Configuration Types:**
- Per-country settings
- Global policies
- Rate adjustments
- Feature flags

---

## 🎨 Design System

### Colors

```css
/* Status Colors */
--success: oklch(0.65 0.15 150)      /* Green */
--warning: oklch(0.68 0.18 45)       /* Orange */
--destructive: oklch(0.55 0.22 30)   /* Red */
--info: oklch(0.60 0.15 240)         /* Blue */
--ai-accent: oklch(0.50 0.18 300)    /* Purple */
```

### Badge Variants

```tsx
// Success
<Badge className="bg-success text-success-foreground">Aprobado</Badge>

// Warning
<Badge className="bg-warning text-warning-foreground">Pendiente</Badge>

// Destructive
<Badge className="bg-destructive text-destructive-foreground">Rechazado</Badge>

// Info
<Badge className="bg-info text-info-foreground">En Revisión</Badge>
```

### Typography

```tsx
// Headers
<h1 className="text-3xl font-bold">Dashboard Title</h1>  // 36px
<h2 className="text-2xl font-bold">Section Title</h2>    // 28px
<h3 className="text-lg font-semibold">Card Title</h3>    // 20px

// Body
<p className="text-base">Primary content</p>              // 16px
<p className="text-sm">Standard text</p>                  // 14px
<span className="text-xs">Caption</span>                  // 12px

// Monospace (IDs, codes)
<code className="font-mono text-sm">VTX-2025-001234</code>
```

---

## 🔧 Common Patterns

### Modal with Confirmation

```tsx
const [showDialog, setShowDialog] = useState(false)
const [selectedItem, setSelectedItem] = useState<Item | null>(null)

// Open modal
const handleViewDetail = (item: Item) => {
  setSelectedItem(item)
  setShowDialog(true)
}

// Dialog component
<Dialog open={showDialog} onOpenChange={setShowDialog}>
  <DialogContent>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### AI Analysis

```tsx
const handleAnalyzeWithAI = async (item: Item) => {
  const prompt = window.spark.llmPrompt`Analyze: ${item.content}`
  const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
  const analysis = JSON.parse(response)
  
  // Update item with AI results
  setItems(current => 
    current.map(i => i.id === item.id ? { ...i, ...analysis } : i)
  )
}
```

### Search and Filter

```tsx
const [searchTerm, setSearchTerm] = useState('')
const [filter, setFilter] = useState('all')

const filteredItems = items.filter(item => {
  const matchesSearch = searchTerm === '' || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesFilter = filter === 'all' || item.status === filter
  return matchesSearch && matchesFilter
})
```

### Status Badge Helper

```tsx
const getStatusBadge = (status: string) => {
  const variants = {
    active: { label: 'Activo', className: 'bg-success' },
    pending: { label: 'Pendiente', className: 'bg-warning' },
    rejected: { label: 'Rechazado', className: 'bg-destructive' }
  }
  const variant = variants[status] || variants.pending
  return <Badge className={variant.className}>{variant.label}</Badge>
}
```

---

## 🚀 Quick Start

### Adding a New SuperAdmin Page

1. **Create page component:**
```tsx
// src/pages/superadmin/SuperAdminNewFeature.tsx
export function SuperAdminNewFeature({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SuperAdminHeader
        title="New Feature"
        subtitle="Description"
        onNavigate={onNavigate}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Content */}
      </div>
    </div>
  )
}
```

2. **Export from index:**
```tsx
// src/pages/superadmin/index.ts
export { SuperAdminNewFeature } from './SuperAdminNewFeature'
```

3. **Add to App.tsx:**
```tsx
// Lazy load
const SuperAdminNewFeature = lazy(() => import('@/pages/superadmin').then(m => ({ 
  default: m.SuperAdminNewFeature 
})))

// Add route
case 'superadmin-new-feature':
  return <SuperAdminNewFeature onNavigate={handleNavigate} />
```

4. **Add to types:**
```tsx
// src/lib/types.ts
export type PageRoute = 
  // ... other routes
  | 'superadmin-new-feature'
```

---

## 📝 Best Practices

### 1. Always Use SuperAdminHeader
Provides consistent navigation and user context.

### 2. Implement Loading States
Use skeleton loaders or spinners for async operations.

### 3. Provide Clear Feedback
Toast notifications for all user actions.

### 4. Validate User Input
Especially for destructive actions (cancellations, deletions).

### 5. Add Audit Logs
Track all critical actions with timestamps and user info.

### 6. Mobile Responsive
Test all components on mobile viewports.

### 7. Accessible
Use semantic HTML and ARIA labels.

### 8. Performance
Lazy load components, paginate large lists.

---

## 🔍 Debugging

### Check KV Store
```tsx
// View stored data
const [data] = useKV('key-name', defaultValue)
console.log('KV Data:', data)
```

### AI Response Issues
```tsx
try {
  const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
  console.log('AI Response:', response)
} catch (error) {
  console.error('AI Error:', error)
  toast.error('AI analysis failed')
}
```

### Navigation Issues
```tsx
// Check current page
const { currentPage, params } = useRouter()
console.log('Current:', currentPage, params)
```

---

## 📚 Resources

- **PRD:** `/ADMIN_MODULES_COMPLETE_PRD.md`
- **Complete Guide:** `/SUPERADMIN_COMPLETE.md`
- **Shadcn Docs:** https://ui.shadcn.com
- **Tailwind Docs:** https://tailwindcss.com
- **Phosphor Icons:** https://phosphoricons.com

---

**Last Updated:** January 2025
**Version:** 1.0.0
