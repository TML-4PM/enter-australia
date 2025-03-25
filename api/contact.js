export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    console.log('New contact submission:', { name, email, message });

    res.status(200).json({ success: true, message: 'Contact form submitted' });
}
