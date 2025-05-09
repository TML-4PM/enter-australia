
import React from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import '../styles/comparison-table.css';

const ComparisonTable = () => {
  const { ASSESSMENT, ENTRY_KIT, GROWTH, PREMIUM, ENTERPRISE } = PRODUCTS;
  
  return (
    <div className="comparison">
      <h3>Compare Our Packages</h3>
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Assessment ({ASSESSMENT.price})</th>
              <th>Entry Kit ({ENTRY_KIT.price})</th>
              <th>Growth ({GROWTH.price}/{GROWTH.period.split(' ')[0]})</th>
              <th>Premium ({PREMIUM.price}/{PREMIUM.period.split(' ')[0]})</th>
              <th>Enterprise ({ENTERPRISE.price})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Market Assessment</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Virtual Office</td>
              <td>—</td>
              <td>Strategic Location</td>
              <td>Premium Location</td>
              <td>Premium Location</td>
              <td>Custom</td>
            </tr>
            <tr>
              <td>Govt Dept Introductions</td>
              <td>—</td>
              <td>1 total</td>
              <td>Up to 2 monthly</td>
              <td>Up to 5 monthly</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>In-person Govt Meetings</td>
              <td>—</td>
              <td>—</td>
              <td>Up to 2 monthly</td>
              <td>Up to 4 monthly</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Tender Response Support</td>
              <td>—</td>
              <td>—</td>
              <td>1 monthly</td>
              <td>Up to 2 monthly</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Local Partner Coordination</td>
              <td>—</td>
              <td>—</td>
              <td>1 partner</td>
              <td>Up to 3 partners</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Compliance Support</td>
              <td>Basic Guidance</td>
              <td>Basic Setup</td>
              <td>Basic Guidance</td>
              <td>Tech & Cybersecurity</td>
              <td>Full Program</td>
            </tr>
            <tr>
              <td>Physical Office</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>When Needed</td>
              <td>Dedicated</td>
            </tr>
            <tr>
              <td>Dedicated Team</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
