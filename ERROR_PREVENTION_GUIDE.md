# Quick Error Prevention Guide

## Common 404 Error Causes & Solutions

### 1. Asset Import Errors ❌ → ✅

**WRONG:**
```tsx
<img src="/src/assets/images/logo.png" />
<img src="@/assets/images/logo.png" />
```

**CORRECT:**
```tsx
import logo from '@/assets/images/logo.png'
<img src={logo} />
```

---

### 2. Invalid PageRoute Handling ❌ → ✅

**WRONG:**
```typescript
return { page: '404' as PageRoute }  // '404' is not a valid PageRoute
return { page: 'unknown-page' }      // Type error
```

**CORRECT:**
```typescript
return { page: 'home' }              // Always use valid PageRoute
return { page: 'not-found' }         // If you add it to the PageRoute type
```

---

### 3. Lazy Loading Import Mismatches ❌ → ✅

**WRONG:**
```typescript
// File: Blog.tsx exports as `export function Blog()`
const Blog = lazy(() => import('@/pages/Blog'))  // Looks for default export
```

**CORRECT:**
```typescript
// Named export
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })))

// OR use default export in the file
export default function Blog() { ... }
const Blog = lazy(() => import('@/pages/Blog'))
```

---

### 4. Missing Route Definitions ❌ → ✅

**WRONG:**
```typescript
// Using a route that doesn't exist in router.ts
onNavigate('my-custom-page')  // Not defined anywhere
```

**CORRECT:**
```typescript
// 1. Add to types.ts PageRoute type
export type PageRoute = 
  | 'home'
  | 'my-custom-page'  // Add here
  | ...

// 2. Add to router.ts routes array
{ pattern: /^\/my-custom-page$/, page: 'my-custom-page', keys: [] }

// 3. Add to pageToPath mapping
'my-custom-page': '/my-custom-page'

// 4. Add render case in App.tsx
case 'my-custom-page':
  return <MyCustomPage onNavigate={handleNavigate} />
```

---

### 5. SPA Server Configuration ❌ → ✅

**Issue:** Refreshing on `/some-route` returns 404 from server

**Solution for Spark:** The Spark runtime handles this automatically. All routes serve `index.html`.

**Solution for other deployments:**
```nginx
# nginx example
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Debugging Checklist

When you see a 404 error:

### 1. Check Browser Console
```
✓ Are there 404 errors for assets (images, fonts, etc)?
✓ Are there 404 errors for API calls?
✓ Are there TypeScript/JavaScript errors?
```

### 2. Check Network Tab
```
✓ What resource is returning 404?
✓ What is the full URL being requested?
✓ Is it an asset, route, or API call?
```

### 3. Check Router Configuration
```
✓ Does the route exist in router.ts?
✓ Does the PageRoute type include it?
✓ Is the RegExp pattern correct?
✓ Is the path mapping correct?
```

### 4. Check Component Exports
```
✓ Is the component exported correctly?
✓ Does the import match the export (named vs default)?
✓ Does the file exist at the import path?
```

### 5. Check Asset Paths
```
✓ Are assets imported, not referenced as strings?
✓ Do the asset files exist in src/assets/?
✓ Are the import paths correct?
```

---

## Quick Fixes

### Asset Not Found
```bash
# Check if file exists
ls src/assets/images/filename.png

# If missing, add it to the correct directory
# Then import it:
import filename from '@/assets/images/filename.png'
```

### Route Not Found
```typescript
// 1. Add to PageRoute type in lib/types.ts
// 2. Add to routes array in lib/router.ts
// 3. Add to pageToPath in lib/router.ts
// 4. Add render case in App.tsx
```

### Component Not Found
```bash
# Check file exists
ls src/pages/ComponentName.tsx

# Check export matches import
# File: export function ComponentName()
# Import: import { ComponentName } from '@/pages/ComponentName'
```

---

## Prevention Best Practices

1. **Always import assets explicitly**
2. **Use TypeScript - it will catch invalid PageRoute usage**
3. **Test routes after adding them**
4. **Follow the project's file naming conventions**
5. **Use the existing PageRoute type, don't create ad-hoc strings**
6. **When adding a new route, update all 4 places (type, routes, pathMap, App.tsx)**

---

## Need Help?

Check these files:
- `lib/types.ts` - All PageRoute types
- `lib/router.ts` - All route patterns and mappings
- `App.tsx` - All page component rendering
- `ERROR_FIXES_SUMMARY.md` - Recent fixes applied

---

**Remember:** The Spark template is opinionated. Follow its conventions and you'll avoid most errors! ✨
