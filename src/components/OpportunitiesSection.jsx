
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/opportunities.css';
import { supabase } from '../utils/supabaseClient';

const OpportunitiesSection = () => {
  const [activeTab, setActiveTab] = useState("defence");
  const [opportunities, setOpportunities] = useState({
    defence: [],
    cyber: [],
    training: []
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        // Fetch opportunities from Supabase
        const { data: defenceData, error: defenceError } = await supabase
          .from('opportunities')
          .select('*')
          .eq('active', true)
          .like('department', '%Defence%')
          .order('deadline', { ascending: true })
          .limit(2);
          
        const { data: cyberData, error: cyberError } = await supabase
          .from('opportunities')
          .select('*')
          .eq('active', true)
          .or('title.ilike.%cyber%,title.ilike.%ai%,title.ilike.%intelligence%')
          .order('deadline', { ascending: true })
          .limit(2);
          
        const { data: trainingData, error: trainingError } = await supabase
          .from('opportunities')
          .select('*')
          .eq('active', true)
          .or('title.ilike.%training%,title.ilike.%simulation%,title.ilike.%space%')
          .order('deadline', { ascending: true })
          .limit(2);
        
        if (defenceError || cyberError || trainingError) {
          throw new Error('Error fetching opportunities');
        }
        
        // Transform data to match the component's expected format
        const transformData = (data) => {
          return data.map(opp => ({
            title: opp.title,
            timing: new Date(opp.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            description: opp.description
          }));
        };
        
        setOpportunities({
          defence: transformData(defenceData || []),
          cyber: transformData(cyberData || []),
          training: transformData(trainingData || [])
        });
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        // Use fallback data if API fails
        setOpportunities({
          defence: [
            {
              title: "$200M AUKUS autonomy program",
              timing: "Q3 2025",
              description: "Joint US-UK-Australia autonomous systems development for underwater surveillance and maritime defense capabilities."
            },
            {
              title: "$30M ADF simulation platform",
              timing: "Q4 2025",
              description: "Advanced training simulation software for Australian Defence Force personnel with VR/AR integration requirements."
            }
          ],
          cyber: [
            {
              title: "$50M ASIO data analytics",
              timing: "Q2 2025",
              description: "Big data analytics and AI solution for national security intelligence processing and threat detection."
            },
            {
              title: "$25M ADF AI defensive systems",
              timing: "Q4 2025",
              description: "Machine learning systems for cyber threat detection and automated response for defense networks."
            }
          ],
          training: [
            {
              title: "$20M RAAF AR training system",
              timing: "Q3 2025",
              description: "Augmented reality training system for Royal Australian Air Force technical maintenance and operations."
            },
            {
              title: "$30M Space Command GIS integration",
              timing: "Q2 2025",
              description: "Geographic information systems with space domain awareness capabilities for Australian Space Command."
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunities();
  }, []);
  
  return (
    <section id="opportunities" className="opportunities-section">
      <h2>Your Tech + Australia's 2025 Tenders = Millions</h2>
      <div className="opportunity-tabs">
        <button 
          className={`tab ${activeTab === 'defence' ? 'active' : ''}`}
          onClick={() => setActiveTab('defence')}
        >
          Defence
        </button>
        <button 
          className={`tab ${activeTab === 'cyber' ? 'active' : ''}`}
          onClick={() => setActiveTab('cyber')}
        >
          Cyber/AI
        </button>
        <button 
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Training/Sim
        </button>
      </div>
      
      <div className="opportunity-content">
        {loading ? (
          <div className="loading-spinner">Loading opportunities...</div>
        ) : (
          <>
            <div className={`opportunity-tab-content ${activeTab === 'defence' ? 'active' : ''}`}>
              {opportunities.defence.map((opp, index) => (
                <div className="opportunity-card" key={index}>
                  <h3>{opp.title}</h3>
                  <p className="timing">{opp.timing}</p>
                  <p className="description">{opp.description}</p>
                </div>
              ))}
            </div>
            
            <div className={`opportunity-tab-content ${activeTab === 'cyber' ? 'active' : ''}`}>
              {opportunities.cyber.map((opp, index) => (
                <div className="opportunity-card" key={index}>
                  <h3>{opp.title}</h3>
                  <p className="timing">{opp.timing}</p>
                  <p className="description">{opp.description}</p>
                </div>
              ))}
            </div>
            
            <div className={`opportunity-tab-content ${activeTab === 'training' ? 'active' : ''}`}>
              {opportunities.training.map((opp, index) => (
                <div className="opportunity-card" key={index}>
                  <h3>{opp.title}</h3>
                  <p className="timing">{opp.timing}</p>
                  <p className="description">{opp.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <button onClick={() => document.getElementById('lead-form').scrollIntoView()} className="secondary-cta">Get Full 2025 Forecast</button>
      <Link to="/pricing" className="cta">Claim Your Spot – $5K</Link>
    </section>
  );
};

export default OpportunitiesSection;
