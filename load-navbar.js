// Function to load the navigation bar
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const data = await response.text();
        document.getElementById('navbar-placeholder').innerHTML = data;

        // Get the current page URL
        const currentPage = window.location.pathname.split('/').pop();

        // Add active class to current page's nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html') || 
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });

        // Initialize hamburger menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}
