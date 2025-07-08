import React from 'react';
import { Filter, Calendar, BarChart3 } from 'lucide-react';

const DashboardFilters = ({ 
  selectedRegion, 
  setSelectedRegion, 
  timeRange, 
  setTimeRange, 
  selectedMetric, 
  setSelectedMetric 
}) => (
  <div className="mb-8 flex flex-wrap gap-4">
    <div className="relative">
      <select 
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      >
        <option value="middle-east">Middle East</option>
        <option value="asia-pacific" disabled>Asia Pacific (Coming Soon)</option>
        <option value="europe" disabled>Europe (Coming Soon)</option>
        <option value="americas" disabled>Americas (Coming Soon)</option>
      </select>
      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
    </div>

    <div className="relative">
      <select 
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      >
        <option value="current">Current Period</option>
        <option value="ytd">Year to Date</option>
        <option value="quarterly">Quarterly</option>
      </select>
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
    </div>

    <div className="relative">
      <select 
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      >
        <option value="all">All Metrics</option>
        <option value="economic">Economic</option>
        <option value="political">Political</option>
        <option value="market">Market Potential</option>
      </select>
      <BarChart3 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
    </div>
  </div>
);

export default DashboardFilters;