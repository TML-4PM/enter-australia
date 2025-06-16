
# Deployment Guide

## Overview

Tech4Humanity Australia is deployed using the Lovable platform with Supabase backend services. This guide covers deployment processes, environment management, and production optimization.

## Deployment Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Development   │    │     Staging      │    │   Production    │
│   (Local)       │    │   (Lovable)      │    │   (Lovable)     │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • Local Vite    │───►│ • Preview Build  │───►│ • Live Site     │
│ • Hot Reload    │    │ • Feature Branch │    │ • Custom Domain │
│ • Dev Tools     │    │ • Integration    │    │ • Performance   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Environment Configuration

### Development Environment
- **Local Server**: `http://localhost:5173`
- **Hot Reload**: Enabled
- **Source Maps**: Enabled
- **Debug Mode**: Enabled
- **API Calls**: Supabase test environment

### Staging Environment  
- **URL**: `https://[project-name]-staging.lovable.app`
- **Purpose**: Feature testing and integration
- **Database**: Supabase production (separate schema)
- **Analytics**: Test tracking ID

### Production Environment
- **URL**: `https://tech4humanity.com.au`
- **Custom Domain**: Configured via Lovable
- **CDN**: Global edge caching
- **Performance**: Optimized builds
- **Monitoring**: Full analytics and error tracking

## Deployment Process

### 1. Pre-Deployment Checklist

#### Code Quality
```bash
# Run tests
npm run test

# Build verification
npm run build

# Bundle analysis
npm run analyze
```

#### Performance Checks
- [ ] Lighthouse scores (Performance > 90)
- [ ] Core Web Vitals compliance
- [ ] Image optimization verified
- [ ] Bundle size under limits
- [ ] Critical CSS inlined

#### Content Verification
- [ ] All translations updated
- [ ] Schema markup validated
- [ ] Meta tags optimized
- [ ] Sitemap generated
- [ ] Analytics tracking verified

### 2. Automated Deployment (Lovable Platform)

#### Continuous Deployment
```javascript
// Automatic deployment on changes
git push origin main
// ↓
// Lovable detects changes
// ↓ 
// Automated build process
// ↓
// Deploy to staging
// ↓
// Automated tests
// ↓
// Deploy to production (if tests pass)
```

#### Build Configuration
```javascript
// vite.config.js
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false, // Disabled in production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['react-i18next', 'i18next'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js']
  }
});
```

### 3. Manual Deployment Steps

#### Via Lovable Interface
1. **Code Changes**: Make changes in Lovable editor
2. **Preview**: Test in right-panel preview
3. **Deploy**: Click "Publish" button
4. **Verify**: Check deployed site

#### Via GitHub Integration
1. **Push Changes**: `git push origin main`
2. **Auto-Deploy**: Lovable automatically builds and deploys
3. **Monitor**: Check deployment status in Lovable
4. **Verify**: Test production site

## Build Optimization

### 1. Bundle Optimization

#### Code Splitting
```javascript
// Lazy load heavy components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));
const InteractiveTools = lazy(() => import('./tools/InteractiveTools'));

// Route-based splitting
const routes = [
  {
    path: '/tools',
    component: lazy(() => import('./ToolsPage'))
  },
  {
    path: '/resources', 
    component: lazy(() => import('./ResourcesPage'))
  }
];
```

#### Tree Shaking
```javascript
// Import only what you need
import { Calculator, BarChart } from 'lucide-react'; // ✅ Good
import * as Icons from 'lucide-react'; // ❌ Imports everything

// Use specific imports for utilities
import debounce from 'lodash/debounce'; // ✅ Good
import _ from 'lodash'; // ❌ Imports entire library
```

### 2. Asset Optimization

#### Image Optimization
```javascript
// Responsive images with modern formats
const OptimizedImage = ({ src, alt, className }) => (
  <picture>
    <source srcSet={`${src}.webp`} type="image/webp" />
    <source srcSet={`${src}.avif`} type="image/avif" />
    <img 
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  </picture>
);
```

#### CSS Optimization
```css
/* Critical CSS inlined in HTML */
/* Above-the-fold styles */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Non-critical CSS loaded asynchronously */
/* Below-the-fold styles in separate files */
```

### 3. Performance Monitoring

#### Core Web Vitals Tracking
```javascript
// Monitor performance metrics
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  if (window.gtag) {
    window.gtag('event', 'web_vital', {
      event_category: 'Performance',
      event_label: metric.name,
      value: Math.round(metric.value)
    });
  }
};

// Track all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Environment Variables and Secrets

### Supabase Configuration
```javascript
// Managed via Lovable + Supabase integration
// No manual configuration needed for:
// - SUPABASE_URL
// - SUPABASE_ANON_KEY
// - SUPABASE_SERVICE_ROLE_KEY (for edge functions)
```

### Third-Party API Keys
```javascript
// Set in Supabase Edge Function secrets
// Access via Deno.env.get() in edge functions
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const googleAnalyticsId = Deno.env.get("GA_MEASUREMENT_ID");
```

### Client-Side Configuration
```javascript
// Public configuration (safe for client-side)
export const config = {
  stripe: {
    publishableKey: 'pk_live_...' // Public key safe in client
  },
  analytics: {
    measurementId: 'G-XXXXXXXXXX'
  },
  app: {
    name: 'Tech4Humanity Australia',
    url: 'https://tech4humanity.com.au'
  }
};
```

## Database Deployment

### 1. Migration Strategy

#### Schema Changes
```sql
-- migrations/001_initial_schema.sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMPTZ,
  active BOOLEAN DEFAULT true
);

-- migrations/002_add_case_studies.sql  
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  featured BOOLEAN DEFAULT false
);
```

#### Data Migration
```javascript
// Migration scripts for data transformation
const migrateOpportunities = async () => {
  const { data: oldData } = await supabase
    .from('old_opportunities')
    .select('*');

  const transformedData = oldData.map(item => ({
    id: item.opportunity_id,
    title: item.name,
    description: item.details,
    deadline: new Date(item.close_date).toISOString()
  }));

  const { error } = await supabase
    .from('opportunities')
    .insert(transformedData);

  if (error) {
    console.error('Migration failed:', error);
  }
};
```

### 2. Backup Strategy

#### Automated Backups
```sql
-- Supabase provides automated backups
-- Manual backup triggers
SELECT pg_dump('database_name') AS backup_data;
```

#### Data Export
```javascript
// Export critical data for backup
const exportData = async () => {
  const tables = ['opportunities', 'case_studies', 'email_subscriptions'];
  const backup = {};

  for (const table of tables) {
    const { data } = await supabase.from(table).select('*');
    backup[table] = data;
  }

  // Save to storage or external service
  const backupData = JSON.stringify(backup, null, 2);
  return backupData;
};
```

## CDN and Caching

### 1. Lovable CDN Configuration

#### Cache Headers
```javascript
// Static assets cached for 1 year
// HTML cached for 1 hour
// API responses cached for 5 minutes

// Cache-Control headers automatically set by Lovable
```

#### Cache Invalidation
```javascript
// Automatic cache invalidation on deployment
// Manual invalidation not typically needed
```

### 2. Browser Caching

#### Service Worker (if implemented)
```javascript
// Cache static resources
const CACHE_NAME = 'tech4humanity-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/static/media/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## Monitoring and Alerting

### 1. Application Monitoring

#### Error Tracking
```javascript
// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Send to monitoring service
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: event.error.message,
      fatal: false
    });
  }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

#### Performance Monitoring
```javascript
// Monitor key metrics
const monitorPerformance = () => {
  // Page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load_time',
        value: loadTime
      });
    }
  });

  // API response times
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const start = performance.now();
    const response = await originalFetch(...args);
    const duration = performance.now() - start;
    
    // Track slow API calls
    if (duration > 1000) {
      console.warn('Slow API call:', args[0], duration);
    }
    
    return response;
  };
};
```

### 2. Uptime Monitoring

#### Health Check Endpoint
```typescript
// supabase/functions/health-check/index.ts
serve(async (req) => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('opportunities')
      .select('id')
      .limit(1);

    if (error) throw error;

    return new Response(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
```

## Security Considerations

### 1. HTTPS and SSL

#### Automatic HTTPS
- Lovable provides automatic HTTPS for all deployments
- SSL certificates automatically managed and renewed
- HTTP requests automatically redirected to HTTPS

### 2. Content Security Policy

```html
<!-- CSP headers for security -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://lzfgigiyqpuuxslsygjt.supabase.co;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://lzfgigiyqpuuxslsygjt.supabase.co https://www.google-analytics.com;
">
```

### 3. API Security

#### Rate Limiting
```javascript
// Implement client-side rate limiting
class RateLimiter {
  constructor(maxRequests = 60, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

const apiLimiter = new RateLimiter();

const makeApiCall = async (url, options) => {
  if (!apiLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded');
  }
  
  return fetch(url, options);
};
```

## Rollback Strategy

### 1. Version Control

#### Git-based Rollback
```bash
# Rollback to previous commit
git revert HEAD

# Push rollback
git push origin main

# Lovable automatically deploys the rollback
```

#### Lovable Version History
- Use Lovable's built-in version history
- Click "Revert" on any previous version
- Instant rollback without Git knowledge

### 2. Database Rollback

#### Schema Rollback
```sql
-- Rollback migration example
-- migration_rollback_002.sql
DROP TABLE IF EXISTS case_studies;
-- Restore previous schema state
```

#### Data Restoration
```javascript
// Restore from backup
const restoreFromBackup = async (backupData) => {
  const backup = JSON.parse(backupData);
  
  for (const [table, data] of Object.entries(backup)) {
    // Clear current data
    await supabase.from(table).delete().neq('id', '');
    
    // Restore backup data
    await supabase.from(table).insert(data);
  }
};
```

## Performance Optimization

### 1. Critical Path Optimization

#### Above-the-fold Content
```javascript
// Prioritize critical resources
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-bg.webp" as="image">

// Critical CSS inlined
<style>
  /* Critical above-the-fold styles */
  .hero-section { /* styles */ }
</style>
```

#### Resource Hints
```html
<!-- DNS prefetching for external resources -->
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//lzfgigiyqpuuxslsygjt.supabase.co">

<!-- Preconnect to critical resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 2. Runtime Performance

#### Component Optimization
```javascript
// Memoize expensive calculations
const ExpensiveComponent = memo(({ data, filters }) => {
  const processedData = useMemo(() => {
    return processLargeDataset(data, filters);
  }, [data, filters]);

  return <div>{/* Render processed data */}</div>;
});

// Debounce user inputs
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useMemo(
    () => debounce((value) => performSearch(value), 300),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedQuery(query);
    }
  }, [query, debouncedQuery]);

  return (
    <input 
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

This comprehensive deployment guide ensures reliable, secure, and performant deployment of the Tech4Humanity Australia platform with proper monitoring and rollback capabilities.
