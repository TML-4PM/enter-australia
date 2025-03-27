
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation and Submission
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        const service = formData.get('service');
        
        // Basic validation
        if (name.length < 2) {
            showAlert('Name must be at least 2 characters.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showAlert('Please enter a valid email.');
            return;
        }
        if (!service) {
            showAlert('Please select a service.');
            return;
        }
        if (message.length < 10) {
            showAlert('Message must be at least 10 characters.');
            return;
        }
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, service, message })
            });
            
            if (!response.ok) throw new Error('Server error');
            
            form.reset();
            showAlert('Message sent successfully! We will contact you shortly.', 'success');
        } catch (error) {
            console.error('Error:', error);
            showAlert('Failed to send message. Try again later.');
        }
    });
    
    // Alert function for form feedback
    function showAlert(message, type = 'error') {
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${type}`;
        alertElement.textContent = message;
        
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Append the new alert right after the form
        form.parentNode.insertBefore(alertElement, form.nextSibling);
        
        // Remove the alert after 4 seconds
        setTimeout(() => {
            alertElement.classList.add('fade-out');
            setTimeout(() => alertElement.remove(), 500);
        }, 4000);
    }
    
    // Add styles for the alert
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .error {
            background-color: #ffecec;
            color: #f44336;
            border-left: 4px solid #f44336;
        }
        
        .success {
            background-color: #e7f7e7;
            color: #4CAF50;
            border-left: 4px solid #4CAF50;
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll effect for header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--light-color)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
});
