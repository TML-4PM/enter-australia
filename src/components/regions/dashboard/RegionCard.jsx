import React from 'react';

const RegionCard = ({ name, countries, totalGDP, activeCount }) => (
  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all">
    <h4 className="font-bold text-slate-900 mb-3 text-lg">{name}</h4>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-slate-600">Countries</span>
        <span className="font-bold text-slate-900 text-lg">{countries.length}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-600">Active</span>
        <span className="font-semibold text-emerald-600">{activeCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-600">Combined GDP</span>
        <span className="font-semibold text-blue-600">${totalGDP.toFixed(0)}B</span>
      </div>
    </div>
  </div>
);

export default RegionCard;