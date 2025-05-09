
export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, service, message } = req.body;
    
    // Basic validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a real application, you would send this data to your email service
    // Always send to troy@tech4humanity.com.au regardless of what email was input
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Here you would have your email sending logic, using actualRecipientEmail
    // Example pseudocode:
    // sendEmail({
    //   to: actualRecipientEmail,
    //   subject: `Contact Form: ${service} inquiry from ${name}`,
    //   body: `Name: ${name}\nOriginal Email: ${email}\nService: ${service}\nMessage: ${message}`
    // });
    
    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
