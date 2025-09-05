
# Tech4Humanity Australia

> Expert Australia market entry services for international technology companies

## 🌟 Overview

Tech4Humanity Australia is a comprehensive web platform designed to help international technology companies successfully enter and expand in the Australian market. The platform provides market intelligence, interactive business tools, expert consultation services, and comprehensive resources for navigating the Australian business landscape.

## 🚀 Key Features

- **Multi-language Support**: Available in English, Korean, Chinese, Arabic, and Hindi
- **Interactive Business Tools**: ROI Calculator and Market Sizing Tool
- **Lead Generation System**: Smart forms with exit-intent optimization
- **Expert Consultation Booking**: Integrated scheduling and payment processing
- **Market Intelligence**: Real-time opportunities and case studies
- **SEO Optimized**: Comprehensive schema markup and analytics

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Payments**: Stripe integration
- **Analytics**: Google Analytics 4, enhanced conversion tracking
- **Internationalization**: react-i18next with dynamic loading
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Lovable platform with custom domain support

## 📋 Prerequisites

- Node.js 18+ 
- Modern web browser
- Supabase account (for backend functionality)
- Stripe account (for payment processing)

## ⚡ Quick Start

### 1. Clone and Install
```bash
git clone [repository-url]
cd tech4humanity-australia
npm install
```

### 2. Environment Setup
Create your environment configuration in Supabase:
- Supabase URL and Anon Key (configured via Lovable integration)
- Stripe keys (configured in Supabase Edge Function secrets)

### 3. Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

### 4. Build for Production
```bash
npm run build
npm run preview
```

## 🏗 Architecture Overview

```
src/
├── components/           # React components
│   ├── home/            # Homepage components
│   ├── tools/           # Interactive business tools
│   ├── seo/             # SEO and schema markup
│   ├── layout/          # Layout components
│   └── ...
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── styles/              # CSS and styling
├── i18n/               # Internationalization
└── config/             # Configuration files
```

## 📚 Documentation

- [Architecture Guide](./docs/architecture.md)
- [Feature Documentation](./docs/features/)
- [Development Workflow](./docs/development/setup.md)
- [API Documentation](./docs/api/)
- [Deployment Guide](./docs/development/deployment.md)

## 🌍 Internationalization

The platform supports 5 languages with smart detection:
- English (default)
- Korean (한국어)
- Chinese (中文)
- Arabic (العربية)
- Hindi (हिन्दी)

## 🔧 Key Integrations

- **Supabase**: Authentication, database, edge functions
- **Stripe**: Payment processing and subscriptions
- **Google Analytics**: Enhanced conversion tracking
- **Calendly**: Expert consultation booking

## 🧪 Testing & Quality

- Pre-deployment checks for performance, accessibility, and SEO
- Browser compatibility testing
- Responsive design validation
- Link checking and content validation

## 📈 Performance

- Vite for fast development and optimized builds
- Dynamic imports for code splitting
- Image optimization and lazy loading
- CDN delivery via Lovable platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Tech4Humanity Australia.

## 📞 Support

- Email: troy@enteraustralia.tech
- Documentation: [docs/](./docs/)
- Issues: Use GitHub Issues for bug reports

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added interactive tools and enhanced analytics
- **v1.2.0** - Implemented multi-language support
- **v1.3.0** - Enhanced SEO and schema markup

---

Built with ❤️ by the Tech4Humanity Australia team
