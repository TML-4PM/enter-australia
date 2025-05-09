
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Jane Tan",
      role: "Co-Founder & Chief Executive Officer",
      bio: "With over 15 years steering digital transformation in both the public and private sectors, Jane founded Enter Australia to bridge the gap between innovative technology companies and Australia's complex regulatory landscape. She began her career at the NSW Department of Finance, leading a $200 million e-government rollout, and later ran Asia-Pacific partnerships for a Fortune 500 SaaS vendor. Jane holds an MBA from Melbourne Business School and is a regular speaker at GovTech conferences.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael O'Connor",
      role: "Co-Founder & Chief Technology Officer",
      bio: "Michael is a full-stack systems architect who has built scalable cloud platforms for global fintech and healthtech firms. Before co-founding Enter Australia, he was CTO of a Sydney-based payments startup that achieved unicorn status. His deep knowledge of AWS, Azure and Google Cloud ensures our clients' solutions meet the highest standards of security, compliance and performance.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Sarah Nguyen",
      role: "Head of Partnerships & Channel Development",
      bio: "Sarah brings a decade of experience forging go-to-market alliances across APAC. She spent five years in Singapore growing strategic reseller networks for an enterprise software leader, and has negotiated joint ventures with top Australian integrators. At Enter Australia, Sarah sources, vets and manages every partnership, ensuring you plug into the right ecosystem of system integrators, value-added resellers and government agencies.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David Fitzpatrick",
      role: "Director of GovTech Services",
      bio: "A former policy adviser in Canberra's Digital Transformation Agency, David knows how to write winning tender responses and navigate federal procurement frameworks. He leads our GovTech practice, helping clients secure large-scale contracts in health, education and defense. David designed the government's first open-data API standards and authored the 'Digital Services in Government' whitepaper that's now a benchmark across OECD countries.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Li Wei",
      role: "Head of Asia-Pacific Operations",
      bio: "Based in our Singapore office, Li coordinates all client engagements across Southeast Asia. Her background includes launching three successful R&D pilots in Malaysia, Indonesia and Vietnam—one of which was later adopted as a national transportation app. Li's on-the-ground expertise ensures that your product is localized both technically and culturally before entering the Australian market.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Ravi Patel",
      role: "Director of Grants & Incentives",
      bio: "Ravi is a funding strategist who has helped clients secure over $75 million in Australian R&D tax incentives, grants and co-innovation programs. A chartered accountant by training, he previously led the grants division at one of Australia's Big Four firms. Ravi's team handles every aspect of your application—from eligibility assessment to rebate maximization and audit defense.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
  ];
  
  const coreValues = [
    {
      name: "Client-First Mindset",
      description: "We treat your success as our own, tailoring approaches to your unique technology and market challenges."
    },
    {
      name: "Local Expertise",
      description: "Every team member has deep roots in Australia's public and private ecosystems."
    },
    {
      name: "Global Perspective",
      description: "We blend international best practices with home-grown insights to accelerate your growth."
    },
    {
      name: "Integrity & Transparency",
      description: "From clear pricing to honest feasibility advice, we believe trust is built on openness."
    }
  ];
  
  const partners = [
    { name: "AWS", logo: "🔷" },
    { name: "Google Cloud", logo: "🔶" },
    { name: "Atlassian", logo: "🔵" },
    { name: "Microsoft", logo: "🟦" },
    { name: "Salesforce", logo: "☁️" },
    { name: "Deloitte", logo: "🔘" },
  ];
  
  return (
    <section id="about" className="about-page">
      <div className="about-hero">
        <h1>About enterAustralia</h1>
        <p>Making Australian market entry seamless for global tech innovators</p>
      </div>
      
      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>Democratize Australian market entry by providing tech companies with the local knowledge, connections, and compliance expertise they need to succeed in one of the world's most stable and innovative economies.</p>
      </div>
      
      <div className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <h3>{value.name}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="about-team">
        <h2>Our Leadership Team</h2>
        <p className="team-intro">At Enter Australia, our strength lies in the depth and diversity of our people. From government insiders to global‐market veterans, our leadership team combines local know-how with international tech expertise to guide your business through every step of Australian expansion.</p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="about-partners">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <span className="partner-icon">{partner.logo}</span>
              <span className="partner-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="about-cta">
        <h2>Ready to explore the Australian market?</h2>
        <Link to="/contact" className="btn primary">Get in Touch</Link>
      </div>
    </section>
  );
};

export default AboutPage;
