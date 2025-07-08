import React from 'react';
import { BarChart3 } from 'lucide-react';

const DashboardHero = () => (
  <div className="mb-12">
    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full mb-4">
      <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-blue-700">Live Intelligence</span>
    </div>
    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
      Central Intelligence Dashboard
    </h1>
    <p className="text-xl text-slate-600 max-w-2xl">Global strategic intelligence and cross-regional analytics</p>
  </div>
);

export default DashboardHero;