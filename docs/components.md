
# Component Architecture

## Component Hierarchy

### Layout Components

#### Header (`components/layout/Header.jsx`)
- **Purpose**: Main navigation and brand identity
- **Props**: `isMenuOpen`, `toggleMenu`, `closeMenu`
- **Features**: 
  - Responsive navigation
  - Language switcher
  - Mobile menu toggle
  - CTA buttons

#### Footer (`components/layout/Footer.jsx`)
- **Purpose**: Site footer with links and information
- **Features**:
  - Multi-column layout
  - Social media links
  - Legal page links
  - Newsletter signup

#### MainLayout (`components/layout/MainLayout.jsx`)
- **Purpose**: Route wrapper and global components
- **Props**: `showLeadForm`, `toggleLeadForm`, `handleFormSubmit`
- **Features**:
  - Route definitions
  - Error boundary wrapper
  - Global state management

### Home Page Components

#### HeroSection (`components/home/HeroSection.jsx`)
- **Purpose**: Primary value proposition and CTA
- **Props**: `toggleLeadForm`
- **Features**:
  - Hero messaging
  - Primary CTA button
  - Background imagery
  - Responsive design

#### WhyAustraliaSection (`components/home/WhyAustraliaSection.jsx`)
- **Purpose**: Market opportunity presentation
- **Features**:
  - Statistical highlights
  - Market benefits
  - Visual elements
  - Engagement tracking

#### CaseStudySection (`components/home/CaseStudySection.jsx`)
- **Purpose**: Social proof and success stories
- **Features**:
  - Case study cards
  - Client testimonials
  - Results metrics
  - Dynamic content loading

#### FooterCtaSection (`components/home/FooterCtaSection.jsx`)
- **Purpose**: Final conversion opportunity
- **Props**: `toggleLeadForm`
- **Features**:
  - Secondary CTA
  - Value reinforcement
  - Contact information

### Interactive Tools

#### ROICalculator (`components/tools/ROICalculator.jsx`)
- **Purpose**: Return on investment calculations
- **State**: Input values, calculation results
- **Features**:
  - Multi-step form
  - Real-time calculations
  - Results visualization
  - Lead capture integration
  - Analytics tracking

```javascript
// Example usage
<ROICalculator
  onComplete={(results) => trackToolCompletion('roi', results)}
  onLeadCapture={(data) => captureLeadData(data)}
/>
```

#### MarketSizingTool (`components/tools/MarketSizingTool.jsx`)
- **Purpose**: Market opportunity analysis
- **State**: Market parameters, sizing results
- **Features**:
  - Industry selection
  - Geographic targeting
  - Market size calculations
  - Export functionality

### SEO Components

#### SchemaMarkup (`components/seo/SchemaMarkup.jsx`)
- **Purpose**: Structured data injection
- **Props**: `type`, `data`
- **Features**:
  - Dynamic schema generation
  - Multiple schema types
  - SEO optimization
  - Server-side rendering support

```javascript
// Schema types supported
- Organization
- LocalBusiness
- WebSite
- Service
- FAQPage
- Article
- BreadcrumbList
```

### Form Components

#### LeadForm (`components/LeadForm.jsx`)
- **Purpose**: Lead capture and qualification
- **Props**: `showLeadForm`, `toggleLeadForm`, `handleFormSubmit`
- **Features**:
  - Multi-step progression
  - Validation logic
  - Analytics integration
  - Success handling

#### ExitIntentPopup (`components/ExitIntentPopup.jsx`)
- **Purpose**: Exit-intent lead capture
- **Props**: `onClose`
- **Features**:
  - Mouse tracking
  - A/B testing
  - Multiple offer types
  - Conversion optimization

### Utility Components

#### ErrorBoundary (`components/ErrorBoundary.jsx`)
- **Purpose**: Error handling and recovery
- **Features**:
  - Error catching
  - Fallback UI
  - Error reporting
  - Recovery options

#### LanguageSwitcher (`components/LanguageSwitcher.jsx`)
- **Purpose**: Multi-language support
- **Features**:
  - Language detection
  - Smooth transitions
  - Persistence
  - Analytics tracking

## Component Patterns

### Container vs Presentational

```javascript
// Container Component (Logic)
const ToolsPageContainer = () => {
  const [activeTab, setActiveTab] = useState('roi');
  const [results, setResults] = useState(null);
  
  return (
    <ToolsPagePresentation
      activeTab={activeTab}
      onTabChange={setActiveTab}
      results={results}
      onResultsChange={setResults}
    />
  );
};

// Presentational Component (UI)
const ToolsPagePresentation = ({ activeTab, onTabChange, results }) => {
  return (
    <div className="tools-page">
      {/* UI elements */}
    </div>
  );
};
```

### Composition Pattern

```javascript
// Flexible composition
<ToolsPage>
  <ToolsHeader />
  <ToolsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
  <ToolsContent>
    {activeTab === 'roi' && <ROICalculator />}
    {activeTab === 'market' && <MarketSizingTool />}
  </ToolsContent>
  <ToolsFooter />
</ToolsPage>
```

### Hook-Based Logic

```javascript
// Custom hook for tool logic
const useToolCalculations = (toolType) => {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const calculate = useCallback(async () => {
    setIsCalculating(true);
    const calculated = await performCalculations(inputs, toolType);
    setResults(calculated);
    setIsCalculating(false);
  }, [inputs, toolType]);
  
  return { inputs, setInputs, results, calculate, isCalculating };
};
```

## Styling Architecture

### Tailwind CSS Classes

```javascript
// Consistent design system
const buttonClasses = {
  primary: "bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors",
  secondary: "bg-white hover:bg-gray-50 text-green-600 font-semibold py-3 px-6 rounded-lg border border-green-600 transition-colors",
  outline: "border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
};
```

### Responsive Design

```javascript
// Mobile-first responsive classes
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
">
```

## Performance Optimization

### Code Splitting

```javascript
// Lazy loading for heavy components
const InteractiveTools = lazy(() => import('./InteractiveTools'));
const AdvancedAnalytics = lazy(() => import('./AdvancedAnalytics'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <InteractiveTools />
</Suspense>
```

### Memoization

```javascript
// Prevent unnecessary re-renders
const ExpensiveCalculation = memo(({ data, options }) => {
  const result = useMemo(() => {
    return performHeavyCalculation(data, options);
  }, [data, options]);
  
  return <div>{result}</div>;
});
```

## Testing Strategy

### Component Testing

```javascript
// Test structure
describe('ROICalculator', () => {
  test('calculates ROI correctly', () => {
    render(<ROICalculator />);
    // Test inputs and outputs
  });
  
  test('handles edge cases', () => {
    // Test error conditions
  });
  
  test('tracks analytics events', () => {
    // Test analytics integration
  });
});
```

### Integration Testing

```javascript
// Full user flow testing
test('complete tool usage flow', async () => {
  render(<ToolsPage />);
  
  // Simulate user interaction
  await userEvent.click(screen.getByText('ROI Calculator'));
  await userEvent.type(screen.getByLabelText('Revenue'), '100000');
  await userEvent.click(screen.getByText('Calculate'));
  
  // Assert results
  expect(screen.getByText(/ROI:/)).toBeInTheDocument();
});
```

## Component Documentation

### PropTypes and TypeScript

```typescript
// Type definitions
interface ROICalculatorProps {
  initialValues?: ROIInputs;
  onComplete?: (results: ROIResults) => void;
  onLeadCapture?: (data: LeadData) => void;
  showAdvanced?: boolean;
}

// Component with types
const ROICalculator: React.FC<ROICalculatorProps> = ({
  initialValues = {},
  onComplete,
  onLeadCapture,
  showAdvanced = false
}) => {
  // Component implementation
};
```

### Documentation Comments

```javascript
/**
 * Interactive ROI Calculator Component
 * 
 * Provides multi-step ROI calculation with lead capture integration.
 * Includes analytics tracking and responsive design.
 * 
 * @param {Object} initialValues - Pre-populate form values
 * @param {Function} onComplete - Callback when calculation completes
 * @param {Function} onLeadCapture - Callback for lead capture
 * @param {boolean} showAdvanced - Show advanced calculation options
 * 
 * @example
 * <ROICalculator
 *   initialValues={{ revenue: 100000 }}
 *   onComplete={handleResults}
 *   onLeadCapture={captureLeads}
 *   showAdvanced={true}
 * />
 */
```
