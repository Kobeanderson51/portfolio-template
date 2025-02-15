// Initialize EmailJS first
(function() {
    try {
        emailjs.init("ECSgXrEZh4MsHs3ZI");
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const nav = document.querySelector('nav');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Navigation Debug:', {
        nav: !!nav,
        hamburgerMenu: !!hamburgerMenu,
        navMenu: !!navMenu,
        navLinks: navLinks.length
    });

    // Ensure navigation is only set up once
    if (window.navigationInitialized) return;
    window.navigationInitialized = true;

    // Only run these functions if all required elements exist
    if (hamburgerMenu && navMenu) {
        // Mobile navigation toggle
        function toggleMobileMenu(event) {
            // Prevent multiple triggers
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            
            console.log('Toggle Mobile Menu Called');
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }

        // Close mobile menu
        function closeMobileMenu() {
            console.log('Close Mobile Menu Called');
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // Remove any existing event listeners first
        const oldHamburgerMenu = document.querySelector('.hamburger-menu');
        const oldNavMenu = document.querySelector('.nav-menu');

        // Hamburger menu click event - use one-time binding
        hamburgerMenu.removeEventListener('click', toggleMobileMenu);
        hamburgerMenu.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking outside
        function handleOutsideClick(event) {
            const isClickInsideNavMenu = navMenu.contains(event.target);
            const isClickInsideHamburger = hamburgerMenu.contains(event.target);

            if (!isClickInsideNavMenu && !isClickInsideHamburger && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }

        // Remove any existing outside click listeners
        document.removeEventListener('click', handleOutsideClick);
        document.addEventListener('click', handleOutsideClick);

        // Add click event to nav links to close mobile menu
        navLinks.forEach(link => {
            // Remove existing listeners to prevent duplicates
            link.removeEventListener('click', closeMobileMenu);
            link.addEventListener('click', closeMobileMenu);
        });
    } else {
        console.error('Navigation elements not found:', {
            hamburgerMenu: !!hamburgerMenu,
            navMenu: !!navMenu
        });
    }

    // Scroll Animation Function (only run if sections exist)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Select elements to animate (with fallback)
    const animatedSections = [
        '.hero', '.about', '.skills', '.projects', '.contact', 
        '.skills-grid .skill-item', '.projects-grid .project-card', 
        '.about-content .profile-image', '.about-content .about-text', 
        '.contact-wrapper', '.services-grid .service-item'
    ];

    animatedSections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            scrollObserver.observe(el);
        });
    });

    // Navigation handling for both internal and external links
    navLinks.forEach(link => {
        link.removeEventListener('click', function(e) {
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Check if it's an internal anchor link or an external page link
            const href = this.getAttribute('href');
            
            // If it's an internal anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } 
            // If it's a contact link on services.html
            else if (href === '#contact' && window.location.pathname.includes('services.html')) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // If it's a contact link on a different page
            else if (href.includes('#contact') && !window.location.pathname.includes(href.split('#')[0])) {
                e.preventDefault();
                window.location.href = href;
            }
            // If it's an external HTML page link
            else if (href.endsWith('.html')) {
                // Optional: Add a transition or loading effect here
                window.location.href = href;
            }
        });
        link.addEventListener('click', function(e) {
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Check if it's an internal anchor link or an external page link
            const href = this.getAttribute('href');
            
            // If it's an internal anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } 
            // If it's a contact link on services.html
            else if (href === '#contact' && window.location.pathname.includes('services.html')) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // If it's a contact link on a different page
            else if (href.includes('#contact') && !window.location.pathname.includes(href.split('#')[0])) {
                e.preventDefault();
                window.location.href = href;
            }
            // If it's an external HTML page link
            else if (href.endsWith('.html')) {
                // Optional: Add a transition or loading effect here
                window.location.href = href;
            }
        });
    });

    // Highlight active nav link based on current page
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Handle contact section navigation if already on the page
    const contactLinks = document.querySelectorAll('a[href$="#contact"]');
    contactLinks.forEach(link => {
        link.removeEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission handler
    async function sendEmail(event) {
        event.preventDefault();
        console.log('Form submission started');

        const form = event.target;
        const submitButton = form.querySelector('.submit-btn');
        const buttonText = submitButton.querySelector('.button-text');
        const loadingSpinner = submitButton.querySelector('.loading-spinner');

        // Show loading state
        buttonText.style.display = 'none';
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;

        try {
            const templateParams = {
                from_name: form.user_name.value,
                from_email: form.user_email.value,
                city: form.city.value,
                phone: form.contact_number.value || 'Not provided',
                message: form.message.value
            };

            console.log('Sending email with params:', templateParams);

            const response = await emailjs.send(
                'service_3iz0wa8',
                'template_eg3szv8',
                templateParams
            );

            console.log('Email sent successfully:', response);
            alert('Message sent successfully!');
            form.reset();
        } catch (error) {
            console.error('Error details:', error);
            alert('Failed to send message. Please try again later. Error: ' + error.message);
        } finally {
            // Reset button state
            buttonText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        }
    }

    // Contact form submission
    if (contactForm) {
        console.log('Contact form found, attaching submit handler');
        contactForm.addEventListener('submit', sendEmail);
    } else {
        console.error('Contact form not found in the DOM');
    }

    // Navigation scroll effect
    window.removeEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Typing Effect for Hero Section
    const heroText = document.querySelector('.hero-content p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Only start typing when section is in view
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(document.querySelector('.hero'));
    }

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('.scroll-to-section');
    ctaButtons.forEach(button => {
        button.removeEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});