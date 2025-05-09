
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
// This key is safe to expose in frontend code
export const stripePromise = loadStripe('pk_test_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in');

// Define the product IDs and details
export const PRODUCTS = {
  ASSESSMENT: {
    name: 'Assessment',
    isSubscription: false,
    price: 'Free',
    period: 'One-time',
    description: 'Get a free market assessment for your business and understand your Australian opportunity.',
    tagline: "Identify your top Australian market opportunities—zero cost, zero commitment.",
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      'Australian Market Overview',
      'Basic Regulatory Guidance',
      '30-minute Strategy Call',
      'Access to Resource Library'
    ],
    targetAudience: [
      'Early-stage startups exploring Australia',
      'Companies curious about gov-sector potential',
      'Businesses evaluating expansion feasibility'
    ],
    process: [
      { title: 'Day 1–2', description: 'Intake form + data gathering' },
      { title: 'Day 3–5', description: 'Market research & compliance mapping' },
      { title: 'Day 6', description: 'Draft report & slide deck' },
      { title: 'Day 7', description: 'Strategy call' },
    ],
    support: 'Email-only support (M–F, 9 am–5 pm AEST) with responses within 3 business days.',
    outcomes: 'Clear map of top 3 entry opportunities with decision-ready intelligence in under one week.',
    caseStudy: 'SaaS startup "CloudX" landed first partner intro within two weeks after our free assessment.'
  },
  ENTRY_KIT: {
    priceId: 'price_1R6NDED6fFdhmypRzqX57oPS',
    name: 'Entry Kit',
    isSubscription: false,
    price: '$5K',
    period: 'One-time payment',
    description: 'One-time payment to establish your Australian presence and get your first government introduction.',
    tagline: "Get set up in Australia—ABN, office, marketing & your first government intro in 30 days.",
    features: [
      'ABN Registration: End-to-end application & lodgement',
      'Virtual office in strategic location',
      'Localized marketing materials',
      'Introduction to one government department',
      'Capability brief development',
      'Compliance Toolkit Expansion',
      '30-day initial market entry support'
    ],
    targetAudience: [
      'Companies ready for an ABN & local presence',
      'Teams needing rapid compliance setup',
      'Businesses targeting a first gov-department intro'
    ],
    process: [
      { title: 'Day 1–3', description: 'ABN & virtual office setup' },
      { title: 'Day 4–10', description: 'Collateral creation & review' },
      { title: 'Day 11–15', description: 'Intro email + follow-up scheduling' },
      { title: 'Day 16–30', description: 'Initial support & adjustments' },
    ],
    support: 'Email + Live Chat (M–F, 9 am–5 pm AEST) with responses within 2 business days.',
    outcomes: 'Legally compliant status in week 1, first gov intro by week 3, and foundational marketing assets ready to go.',
    caseStudy: '"HealthTechY" secured their first state-level pilot within 28 days.'
  },
  GROWTH: {
    priceId: 'price_1R7DVLD6fFdhmypRyEkK3z52',
    name: 'Growth Plan',
    isSubscription: true,
    price: '$5K',
    period: 'per month',
    description: 'Monthly service to develop your Australian market presence with targeted government introductions.',
    tagline: "Scale your presence—monthly government intros, tenders & partner coordination.",
    features: [
      '2× Govt Dept Intros/month',
      'Virtual office in premium location',
      '2× In-person govt meetings monthly',
      '1× Tender response support monthly',
      '1× Local partner coordination',
      'Basic compliance guidance',
      'Monthly Progress Report & Roadmap'
    ],
    targetAudience: [
      'Companies with initial setup complete',
      'Teams seeking regular gov-sector traction',
      'Businesses aiming for repeatable pipeline growth'
    ],
    process: [
      { title: 'Month Start', description: 'Strategy alignment call' },
      { title: 'Week 1–2', description: 'Identify & outreach to depts' },
      { title: 'Week 2–3', description: 'Schedule & prep meetings' },
      { title: 'Week 3–4', description: 'Tender drafting & partner tasks' },
      { title: 'Ongoing', description: 'Monthly report & next month\'s plan' }
    ],
    support: 'Email, Live Chat, Phone (M–F, 8 am–6 pm AEST) with responses within 1 business day.',
    outcomes: '2–4 qualified gov leads per month with 10–15% uplift in pipeline monthly.',
    caseStudy: '"AgriSys" doubled their tender shortlist rate in 3 months on this plan.'
  },
  PREMIUM: {
    name: 'Premium Retainer',
    isSubscription: true,
    price: '$15K',
    period: 'per month',
    description: 'Comprehensive monthly service to actively pursue and win Australian government contracts.',
    tagline: "Own the gov-sector—high-touch support, 5 intros, 4 meetings & multiple tenders.",
    features: [
      '5× Govt Dept Intros/month',
      'Physical office presence when needed',
      '4× In-person govt meetings monthly',
      '2× Tender responses monthly',
      '3× Local partner coordination',
      'Tech & cybersecurity compliance support',
      'Monthly Exec Business Review',
      'Custom Integration Assistance'
    ],
    targetAudience: [
      'Scale-ready enterprises targeting gov contracts',
      'Teams needing deep compliance & security support',
      'Businesses aiming for consistent deal flow'
    ],
    process: [
      { title: 'Month Start', description: 'Executive alignment workshop' },
      { title: 'Weeks 1–2', description: 'Dept & partner outreach' },
      { title: 'Weeks 2–4', description: 'Meetings, tender prep, integration tasks' },
      { title: 'Last Week', description: 'Exec review & next-month kickoff' }
    ],
    support: '24/5 dedicated Slack channel, Phone, Email with response within 4 hours and quarterly on-site workshop.',
    outcomes: '5–10 active opportunities in funnel with approximately 3× pipeline growth in 6 months.',
    caseStudy: '"EduPlatformZ" won two multi-million dollar contracts within 4 months.',
    featured: true
  },
  ENTERPRISE: {
    name: 'Enterprise',
    isSubscription: true,
    price: 'Custom',
    period: 'Tailored',
    description: 'Custom solution for large organizations requiring extensive support and dedicated resources.',
    tagline: "Tailored end-to-end program—dedicated team, unlimited scale, SLA-backed support.",
    features: [
      'Unlimited Govt Dept Intros + Meetings',
      'Weekly Calls + On-site Support',
      'Unlimited Tender Responses',
      'Full R&D Program & Admin',
      'Custom System Integrations',
      'Dedicated Account Team',
      'Bespoke Solutions',
      'Quarterly Executive Summits'
    ],
    targetAudience: [
      'Large multinationals or high-growth unicorns',
      'Organizations with complex compliance or integration needs',
      'Teams requiring 24/7 coverage and bespoke deliverables'
    ],
    process: [
      { title: 'Kickoff', description: 'Custom roadmap workshop & governance setup' },
      { title: 'Ongoing', description: 'Weekly sprints for intros, tenders, integrations' },
      { title: 'Quarterly', description: 'Business review & strategy reset' },
      { title: 'Ad hoc', description: 'On-site support & training' }
    ],
    support: '24/7 dedicated account team with SLA: < 1 hr for critical issues; < 4 hrs for high-priority, plus custom reporting dashboards.',
    outcomes: 'Measurable enterprise-grade contract wins, strategic partnerships & co-sell agreements, and sustained pipeline growth YoY.',
    caseStudy: '"FinServCorp" onboarded 5 new state gov-projects in their first 6 months.'
  }
};
