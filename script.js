document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    const form = document.getElementById('contact-form');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        if (name.length < 2) {
            alert('Name must be at least 2 characters.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (message.length < 10) {
            alert('Message must be at least 10 characters.');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) throw new Error('Server error');
            form.reset();
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Try again later.');
        }
    });
});
