document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top');

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Add aria-expanded attribute for accessibility
        const isExpanded = navList.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);
        }
    });

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);
        }
    });

    // Scroll to top button visibility
    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    
        // Header background change on scroll
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('href').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                navList.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            }
        });
    });

    // Initialize tab switching if on sponsorship page
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    if (tabs.length > 0 && contents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
});