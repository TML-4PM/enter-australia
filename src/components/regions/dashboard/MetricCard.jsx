import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
  <div 
    className={`group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color.replace('text-', 'from-').replace('-600', '-500')} to-${color.replace('text-', '').replace('-600', '-600')} rounded-xl flex items-center justify-center mr-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {subtitle && <div className="text-sm text-slate-500 mt-1">{subtitle}</div>}
      </div>
    </div>
  </div>
);

export default MetricCard;