
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    // Log the contact submission (in a real app, you would save to a database or send an email)
    console.log('New contact submission:', { name, email, service, message });

    // Here you would typically send an email or save to a database
    // For demonstration purposes, we're just returning a success response

    res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted',
        data: { name, email, service, message }
    });
}
