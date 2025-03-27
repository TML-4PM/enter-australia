
import React from 'react';
import { PRODUCTS } from '../config/stripeConfig';

const ComparisonTable = () => {
  const { ENTRY_KIT, GROWTH_PLAN, PREMIUM_RETAINER } = PRODUCTS;
  
  return (
    <div className="comparison">
      <h3>Comparison</h3>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Entry Kit ({ENTRY_KIT.price})</th>
            <th>Growth Plan ({GROWTH_PLAN.price}/{GROWTH_PLAN.period.split(' ')[0]})</th>
            <th>Premium Retainer ({PREMIUM_RETAINER.price}/{PREMIUM_RETAINER.period.split(' ')[0]})</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABN Registration</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Office</td>
            <td>Virtual</td>
            <td>Virtual Premium</td>
            <td>Physical (as needed)</td>
          </tr>
          <tr>
            <td>Government Meetings</td>
            <td>1</td>
            <td>Up to 2 monthly</td>
            <td>Up to 4 monthly</td>
          </tr>
          <tr>
            <td>Tender Support</td>
            <td>Basic</td>
            <td>1 per month</td>
            <td>Up to 2 per month</td>
          </tr>
          <tr>
            <td>Local Partner Connections</td>
            <td>-</td>
            <td>1</td>
            <td>Up to 3</td>
          </tr>
          <tr>
            <td>Compliance Support</td>
            <td>-</td>
            <td>Basic</td>
            <td>Comprehensive</td>
          </tr>
          <tr>
            <td>Progress Reporting</td>
            <td>-</td>
            <td>Monthly</td>
            <td>Weekly & Monthly</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
