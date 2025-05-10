
import React from 'react';
import { Calendar } from 'lucide-react';

const WebinarHeader = () => {
  return (
    <div className="webinar-registration-header">
      <Calendar className="webinar-icon" />
      <h3>Register for a Live Demonstration</h3>
      <p>Join our product specialists for a personalized walkthrough of our services and how they can help your business enter the Australian market.</p>
    </div>
  );
};

export default WebinarHeader;
