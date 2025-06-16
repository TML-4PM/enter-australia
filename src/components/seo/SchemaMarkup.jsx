
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaMarkup = ({ type, data }) => {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseSchema,
          name: "Tech4Humanity Australia",
          url: "https://tech4humanity.com.au",
          logo: "https://tech4humanity.com.au/logo.png",
          description: "Expert Australia market entry services for international technology companies",
          address: {
            "@type": "PostalAddress",
            addressCountry: "AU",
            addressRegion: "NSW",
            addressLocality: "Sydney"
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+61-xxx-xxx-xxx",
            contactType: "Customer Service",
            areaServed: "AU",
            availableLanguage: ["en", "ko", "zh", "hi", "ar"]
          },
          sameAs: [
            "https://linkedin.com/company/tech4humanity-australia",
            "https://twitter.com/tech4humanity_au"
          ]
        };

      case 'Service':
        return {
          ...baseSchema,
          name: data?.name || "Australia Market Entry Services",
          description: data?.description || "Comprehensive market entry and expansion services for the Australian market",
          provider: {
            "@type": "Organization",
            name: "Tech4Humanity Australia"
          },
          areaServed: "AU",
          serviceType: "Business Consulting",
          category: "Market Entry Services"
        };

      case 'FAQPage':
        return {
          ...baseSchema,
          mainEntity: data?.faqs?.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          })) || []
        };

      case 'Article':
        return {
          ...baseSchema,
          headline: data?.title,
          description: data?.description,
          author: {
            "@type": "Organization",
            name: "Tech4Humanity Australia"
          },
          publisher: {
            "@type": "Organization",
            name: "Tech4Humanity Australia",
            logo: {
              "@type": "ImageObject",
              url: "https://tech4humanity.com.au/logo.png"
            }
          },
          datePublished: data?.publishDate || new Date().toISOString(),
          dateModified: data?.modifyDate || new Date().toISOString()
        };

      case 'LocalBusiness':
        return {
          ...baseSchema,
          name: "Tech4Humanity Australia",
          description: "Australia market entry specialists helping international companies expand Down Under",
          url: "https://tech4humanity.com.au",
          telephone: "+61-xxx-xxx-xxx",
          address: {
            "@type": "PostalAddress",
            addressCountry: "AU",
            addressRegion: "NSW",
            addressLocality: "Sydney"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -33.8688,
            longitude: 151.2093
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00"
          },
          priceRange: "$$$$"
        };

      case 'WebSite':
        return {
          ...baseSchema,
          url: "https://tech4humanity.com.au",
          name: "Tech4Humanity Australia",
          description: "Expert Australia market entry services for international technology companies",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://tech4humanity.com.au/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };

      case 'BreadcrumbList':
        return {
          ...baseSchema,
          itemListElement: data?.breadcrumbs?.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url
          })) || []
        };

      default:
        return baseSchema;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(generateSchema())}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
