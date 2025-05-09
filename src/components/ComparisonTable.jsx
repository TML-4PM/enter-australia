
import React from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import '../styles/comparison-table.css';

const ComparisonTable = () => {
  const { ASSESSMENT, LAUNCH, GROWTH, SCALE, ENTERPRISE } = PRODUCTS;
  
  return (
    <div className="comparison">
      <h3>Compare Our Packages</h3>
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Assessment ({ASSESSMENT.price})</th>
              <th>Launch ({LAUNCH.price}/{LAUNCH.period.split(' ')[0]})</th>
              <th>Growth ({GROWTH.price}/{GROWTH.period.split(' ')[0]})</th>
              <th>Scale ({SCALE.price}/{SCALE.period.split(' ')[0]})</th>
              <th>Enterprise ({ENTERPRISE.price})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Free Market Assessment</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Compliance Toolkit</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Dedicated Advisor Calls</td>
              <td>—</td>
              <td>1× / month</td>
              <td>2× / month</td>
              <td>Weekly</td>
              <td>Weekly + On-site</td>
            </tr>
            <tr>
              <td>Partnership Introductions</td>
              <td>—</td>
              <td>1× / quarter</td>
              <td>3× / quarter</td>
              <td>Unlimited</td>
              <td>Unlimited + Co-sell</td>
            </tr>
            <tr>
              <td>On-site Launch Support</td>
              <td>—</td>
              <td>1 week</td>
              <td>2 weeks</td>
              <td>1 month</td>
              <td>As needed</td>
            </tr>
            <tr>
              <td>R&D Grants & Rebates</td>
              <td>—</td>
              <td>Up to $25K</td>
              <td>Up to $50K</td>
              <td>Full Program</td>
              <td>Full Program + Admin</td>
            </tr>
            <tr>
              <td>GovTech Tender Response</td>
              <td>—</td>
              <td>—</td>
              <td>1× / year</td>
              <td>3× / year</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Custom Integrations</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Dedicated Account Team</td>
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
