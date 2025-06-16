# Development Environment Setup

## Prerequisites

### Required Software
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Recommended Tools
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Auto Rename Tag
  - Prettier - Code formatter
  - ESLint
- **React Developer Tools** browser extension
- **Postman** or **Insomnia** for API testing

## Local Development Setup

### 1. Project Initialization

```bash
# Clone the repository
git clone [repository-url]
cd tech4humanity-australia

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### 2. Environment Configuration

#### Supabase Integration
1. Connect to Supabase via the Lovable interface (green Supabase button)
2. Environment variables are managed through Supabase integration
3. No local `.env` files needed when using Lovable + Supabase

#### Required Supabase Configuration
```javascript
// Automatically configured via Lovable integration
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for edge functions)
```

### 3. Database Setup

#### Initial Schema Migration
```sql
-- Run in Supabase SQL editor
-- Create core tables
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  target_email TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Create policies as needed
```

#### Sample Data Population
```sql
-- Insert sample opportunities
INSERT INTO opportunities (title, description, deadline, active) VALUES
('AUKUS Technology Partnership', 'Defense technology opportunities under AUKUS agreement', '2024-12-31', true),
('Clean Energy Innovation Fund', 'Renewable energy project funding', '2024-11-30', true),
('Digital Health Initiative', 'Healthcare technology transformation', '2025-01-15', true);
```

## Development Workflow

### 1. Code Structure

```
src/
├── components/           # React components
│   ├── home/            # Homepage components
│   ├── tools/           # Interactive tools
│   ├── layout/          # Layout components
│   ├── seo/             # SEO components
│   └── [feature]/       # Feature-specific components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── styles/              # CSS files
├── i18n/               # Internationalization
│   └── locales/        # Translation files
└── config/             # Configuration files
```

### 2. Component Development Guidelines

#### Create New Components
```bash
# Create component directory
mkdir src/components/[feature-name]

# Create component file
touch src/components/[feature-name]/ComponentName.jsx
```

#### Component Template
```javascript
// src/components/example/ExampleComponent.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ExampleComponent = ({ prop1, prop2, onAction }) => {
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  const handleAction = () => {
    // Action logic
    onAction?.(data);
  };

  return (
    <div className="example-component">
      <h2>{t('example.title')}</h2>
      {/* Component content */}
    </div>
  );
};

export default ExampleComponent;
```

### 3. Styling Guidelines

#### Tailwind CSS Classes
```javascript
// Consistent design system usage
const buttonVariants = {
  primary: "bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors",
  secondary: "bg-white hover:bg-gray-50 text-green-600 font-semibold py-3 px-6 rounded-lg border border-green-600 transition-colors",
  outline: "border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
};

// Responsive design patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

#### Custom CSS (when needed)
```css
/* src/styles/components/custom-component.css */
.custom-component {
  @apply relative overflow-hidden;
}

.custom-component::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-10;
}
```

### 4. State Management

#### Local Component State
```javascript
const [formData, setFormData] = useState({
  email: '',
  company: '',
  industry: ''
});

const updateField = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### Custom Hooks for Shared Logic
```javascript
// src/hooks/useFormValidation.js
import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName];
    if (rule && !rule.test(value)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: rule.message
      }));
      return false;
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  }, [validationRules]);

  return { values, errors, touched, validate, setValues, setTouched };
};
```

## Testing Setup

### 1. Unit Testing with Vitest

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

#### Test Configuration
```javascript
// vite.config.js
export default defineConfig({
  // ... existing config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  }
});
```

#### Setup File
```javascript
// src/test/setup.js
import '@testing-library/jest-dom';
import { beforeAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  // Global setup
});

afterEach(() => {
  cleanup();
});
```

### 2. Component Testing Example

```javascript
// src/components/tools/__tests__/ROICalculator.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ROICalculator from '../ROICalculator';

describe('ROICalculator', () => {
  test('renders calculator form', () => {
    render(<ROICalculator />);
    expect(screen.getByLabelText(/annual revenue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/entry costs/i)).toBeInTheDocument();
  });

  test('calculates ROI correctly', () => {
    const onComplete = vi.fn();
    render(<ROICalculator onComplete={onComplete} />);
    
    fireEvent.change(screen.getByLabelText(/annual revenue/i), {
      target: { value: '1000000' }
    });
    fireEvent.change(screen.getByLabelText(/entry costs/i), {
      target: { value: '100000' }
    });
    fireEvent.click(screen.getByText(/calculate/i));

    expect(onComplete).toHaveBeenCalledWith({
      roiPercentage: expect.any(Number),
      paybackMonths: expect.any(Number)
    });
  });
});
```

## Debugging Setup

### 1. Browser DevTools

#### React Developer Tools
```javascript
// Enable React DevTools profiling in development
if (process.env.NODE_ENV === 'development') {
  window.React = React;
}
```

#### Console Debugging
```javascript
// Development-only console logs
const debugLog = (message, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 ${message}:`, data);
  }
};

// Usage in components
debugLog('User interaction', { event: 'button_click', buttonId: 'cta-main' });
```

### 2. Network Debugging

#### API Call Monitoring
```javascript
// src/utils/debugUtils.js
export const monitorApiCalls = () => {
  if (process.env.NODE_ENV === 'development') {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      console.log('🌐 API Call:', args[0]);
      const response = await originalFetch(...args);
      console.log('📨 API Response:', response.status, response.statusText);
      return response;
    };
  }
};
```

### 3. Supabase Debugging

```javascript
// Enable Supabase logging in development
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      debug: process.env.NODE_ENV === 'development'
    }
  }
);

// Monitor Supabase operations
if (process.env.NODE_ENV === 'development') {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔐 Auth state change:', event, session);
  });
}
```

## Performance Optimization

### 1. Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze
```

### 2. Code Splitting

```javascript
// Lazy load heavy components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### 3. Image Optimization

```javascript
// Responsive images with lazy loading
const OptimizedImage = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
  />
);
```

## IDE Configuration

### VS Code Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    "className\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]"
  ]
}
```

### Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

## Common Development Tasks

### 1. Adding New Routes

```javascript
// Add to src/components/layout/MainLayout.jsx
<Route path="/new-feature" element={<NewFeatureComponent />} />
```

### 2. Adding New Translations

```json
// Add to src/i18n/locales/en.json
{
  "newFeature": {
    "title": "New Feature",
    "description": "Feature description"
  }
}
```

### 3. Creating API Endpoints

```javascript
// Create Supabase Edge Function
// supabase/functions/new-endpoint/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

serve(async (req) => {
  // Function logic
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
});
```

### 4. Adding Analytics Events

```javascript
// Use existing analytics utilities
import { trackCtaClick } from '../utils/analyticsUtils';

const handleButtonClick = () => {
  trackCtaClick('New Feature CTA', 'feature-page');
  // Button logic
};
```

This development setup provides a comprehensive foundation for building and maintaining the Tech4Humanity Australia platform with modern React development practices.
