
import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import '../styles/live-chat.css';

const LiveChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I'm here to help you find the right plan for your business. Would you like to see which plan fits your needs?"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showBotOptions, setShowBotOptions] = useState(true);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Track chat open/close events
    if (window.gtag && !isOpen) {
      window.gtag('event', 'chat_open', {
        'event_category': 'Engagement',
        'event_label': 'Chat Bot'
      });
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: newMessage }
    ]);
    
    // Track user message
    if (window.gtag) {
      window.gtag('event', 'chat_message_sent', {
        'event_category': 'Engagement',
        'event_label': 'Chat Message'
      });
    }
    
    // Simulate bot response based on message content
    setTimeout(() => {
      let botResponse = "I'm not sure about that. Would you like to speak with a sales representative?";
      
      const lowerMsg = newMessage.toLowerCase();
      
      if (lowerMsg.includes('pricing') || lowerMsg.includes('price')) {
        botResponse = "We offer several pricing tiers, from our free Assessment to our customized Enterprise solution. What's your budget range?";
        setShowBotOptions(true);
      } else if (lowerMsg.includes('assessment') || lowerMsg.includes('free')) {
        botResponse = "Our Assessment plan is completely free and gives you a market evaluation and 30-minute strategy call. Would you like to sign up?";
        setShowBotOptions(true);
      } else if (lowerMsg.includes('entry') || lowerMsg.includes('kit') || lowerMsg.includes('$5k')) {
        botResponse = "Our Entry Kit is perfect for businesses ready to establish their Australian presence. For $5K one-time, you get ABN registration, virtual office, and your first government introduction!";
      } else if (lowerMsg.includes('growth') || lowerMsg.includes('monthly')) {
        botResponse = "The Growth Plan at $5K/month is ideal for scaling your presence with regular government introductions and tender support.";
      } else if (lowerMsg.includes('premium') || lowerMsg.includes('retainer')) {
        botResponse = "Our Premium Retainer at $15K/month provides high-touch support with 5 government intros monthly and comprehensive tender assistance.";
      } else if (lowerMsg.includes('enterprise')) {
        botResponse = "Our Enterprise solution is fully custom-tailored to large organizations requiring extensive support and dedicated resources. Would you like to schedule a consultation?";
      } else if (lowerMsg.includes('download') || lowerMsg.includes('pdf')) {
        botResponse = "You can download detailed PDF blueprints for any of our plans on their respective detail pages. Which plan are you interested in?";
      } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        botResponse = "Hello! How can I help you today with your Australian market entry plans?";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      
    }, 1000);
    
    setNewMessage('');
  };
  
  const selectPlanOption = (plan) => {
    // Add user selection as a message
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `I'm interested in the ${plan} plan.` }
    ]);
    
    // Track option selection
    if (window.gtag) {
      window.gtag('event', 'chat_option_selected', {
        'event_category': 'Lead Qualification',
        'event_label': plan
      });
    }
    
    // Hide options after selection
    setShowBotOptions(false);
    
    // Simulate bot response for each plan
    setTimeout(() => {
      let response = "";
      
      switch (plan) {
        case 'Assessment':
          response = "Great choice! Our Assessment plan gives you a free market evaluation and a 30-minute strategy call. Would you like to sign up now or learn more?";
          break;
        case 'Entry Kit':
          response = "The Entry Kit is perfect for starting your Australian journey. For $5K one-time, you'll get your ABN, virtual office, and first government introduction. Would you like to see the detailed PDF blueprint?";
          break;
        case 'Growth':
          response = "Our Growth plan at $5K/month helps you scale with regular government introductions and tender support. Would you like me to connect you with a sales rep to discuss details?";
          break;
        case 'Premium':
          response = "The Premium Retainer offers high-touch support at $15K/month with 5 government intros and comprehensive tender assistance. Shall I schedule a call with our senior consultant?";
          break;
        case 'Enterprise':
          response = "Our Enterprise solution is custom-tailored for large organizations. I'd recommend scheduling a consultation with our team to discuss your specific requirements. Would that be helpful?";
          break;
        default:
          response = "I'd be happy to provide more details about this plan. What specific aspect are you most interested in?";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000);
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <>
      <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chat-container">
            <div className="chat-header">
              <h3>enterAustralia<span>tech</span> Assistant</h3>
              <button onClick={toggleChat} className="close-chat">
                <X size={18} />
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              
              {showBotOptions && (
                <div className="chat-options">
                  <p>I'm interested in:</p>
                  <div className="option-buttons">
                    <button onClick={() => selectPlanOption('Assessment')}>Assessment (Free)</button>
                    <button onClick={() => selectPlanOption('Entry Kit')}>Entry Kit ($5K)</button>
                    <button onClick={() => selectPlanOption('Growth')}>Growth Plan ($5K/mo)</button>
                    <button onClick={() => selectPlanOption('Premium')}>Premium ($15K/mo)</button>
                    <button onClick={() => selectPlanOption('Enterprise')}>Enterprise (Custom)</button>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
        
        <button 
          className={`chat-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleChat}
          aria-label="Toggle chat"
        >
          <MessageSquare size={24} />
          <span className="chat-label">Chat</span>
        </button>
      </div>
    </>
  );
};

export default LiveChatBot;
