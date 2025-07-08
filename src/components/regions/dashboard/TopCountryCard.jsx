import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopCountryCard = ({ country, rank }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="group bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => navigate(`/regions/middle-east/${country.slug}`)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3 shadow-lg">
            {rank}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{country.name}</h4>
            <div className="text-sm text-slate-600">{country.capital}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-slate-500">GDP</span>
          <div className="font-bold text-blue-600">{country.gdp}</div>
        </div>
        <div>
          <span className="text-slate-500">Population</span>
          <div className="font-semibold text-slate-700">{country.population}</div>
        </div>
        <div>
          <span className="text-slate-500">Priority</span>
          <div className={`font-bold capitalize ${
            country.priority === 'high' ? 'text-red-600' :
            country.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {country.priority}
          </div>
        </div>
        <div>
          <span className="text-slate-500">Status</span>
          <div className="font-semibold text-emerald-600 capitalize">{country.status}</div>
        </div>
      </div>
    </div>
  );
};

export default TopCountryCard;