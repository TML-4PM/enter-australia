
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
    
    // Tab switching for Opportunities section
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.opportunity-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding tab content
            const index = Array.from(tabs).indexOf(tab);
            if (tabContents[index]) {
                tabContents[index].classList.add('active');
            }
        });
    });
    
    // Lead Magnet Form Toggle
    const leadMagnetBtn = document.querySelector('.secondary-cta');
    const leadFormOverlay = document.querySelector('.lead-form-overlay');
    const closeBtn = document.querySelector('.close-btn');
    
    if (leadMagnetBtn && leadFormOverlay && closeBtn) {
        leadMagnetBtn.addEventListener('click', () => {
            leadFormOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', () => {
            leadFormOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside the form
        leadFormOverlay.addEventListener('click', (e) => {
            if (e.target === leadFormOverlay) {
                leadFormOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form Validation and Submission
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const company = formData.get('company')?.trim();
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
            if (company && company.length < 2) {
                showAlert('Company name must be at least 2 characters.');
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
                // Here you would normally send the form data to your server
                // Simulating a successful API call
                setTimeout(() => {
                    form.reset();
                    showAlert('Message sent successfully! We will contact you shortly.', 'success');
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
                showAlert('Failed to send message. Try again later.');
            }
        });
    }
    
    // Lead form submission
    const leadForm = document.querySelector('.lead-form-container form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(leadForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const company = formData.get('company').trim();
            
            // Basic validation
            if (name.length < 2) {
                alert('Name must be at least 2 characters.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            if (company.length < 2) {
                alert('Company name must be at least 2 characters.');
                return;
            }
            
            // Simulate form submission success
            leadForm.reset();
            leadFormOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            showAlert('Thank you! Your 2025 Bid Forecast has been sent to your email.', 'success');
        });
    }
    
    // Alert function for form feedback
    function showAlert(message, type = 'error') {
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${type}`;
        alertElement.textContent = message;
        
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Append the new alert after the form
        if (form) {
            form.parentNode.insertBefore(alertElement, form.nextSibling);
        } else {
            document.body.appendChild(alertElement);
        }
        
        // Remove the alert after 4 seconds
        setTimeout(() => {
            alertElement.classList.add('fade-out');
            setTimeout(() => alertElement.remove(), 500);
        }, 4000);
    }
    
    // Add scroll effect for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'var(--light-color)';
                header.style.boxShadow = 'var(--shadow)';
            }
        });
    }
});
