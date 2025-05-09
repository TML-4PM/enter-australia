
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import '../styles/profile.css';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setError('Could not load profile data. Please try again later.');
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        
        {error && <div className="profile-error">{error}</div>}
        
        {profile ? (
          <div className="profile-details">
            <div className="profile-section">
              <h3>Account Information</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {profile.company}</p>
              <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="profile-section">
              <h3>Subscription Details</h3>
              <div className={`subscription-badge ${profile.subscription_tier}`}>
                {profile.subscription_tier === 'free' ? 'Free Tier' : profile.subscription_tier}
              </div>
              
              {profile.subscription_tier === 'free' ? (
                <div className="upgrade-prompt">
                  <p>Upgrade to access premium features and support.</p>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="upgrade-btn"
                  >
                    View Pricing Options
                  </button>
                </div>
              ) : (
                <div className="subscription-info">
                  <p><strong>Status:</strong> Active</p>
                  {profile.subscription_end && (
                    <p><strong>Renews on:</strong> {new Date(profile.subscription_end).toLocaleDateString()}</p>
                  )}
                  <button 
                    onClick={() => navigate('/manage-subscription')}
                    className="manage-subscription-btn"
                  >
                    Manage Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="profile-error">
            Profile not found. Please contact support.
          </div>
        )}
        
        <div className="profile-actions">
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
