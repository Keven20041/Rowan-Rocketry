document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.querySelector('.scroll-top');
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Throttle function for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Scroll to top button visibility and header background change
    const handleScroll = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                navList.classList.remove('active');
            }
        });
    });

    // Tab switching in the sponsorship.html page
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Initialize sliders
    function initializeSliders() {
        const sliders = document.querySelectorAll('.image-slider');
        sliders.forEach((slider) => {
            const container = slider.querySelector('.slider-container');
            const prevButton = slider.querySelector('.slider-button-left');
            const nextButton = slider.querySelector('.slider-button-right');
            const items = slider.querySelectorAll('.slider-item');
            let currentIndex = 0;

            function updateSlider() {
                container.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            function goToNext() {
                currentIndex = (currentIndex + 1) % items.length;
                updateSlider();
            }

            function goToPrev() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateSlider();
            }

            prevButton.addEventListener('click', goToPrev);
            nextButton.addEventListener('click', goToNext);

            // Touch events for mobile swipe
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    goToNext();
                } else if (touchEndX - touchStartX > 50) {
                    goToPrev();
                }
            }, { passive: true });
        });
    }

    // Scroll to top button functionality
    function initializeScrollToTop() {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize all functionalities
    initializeSliders();
    initializeScrollToTop();

    // Smooth button animation
    function animateButtons() {
        const buttons = document.querySelectorAll('.btn');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        buttons.forEach(button => {
            observer.observe(button);
        });
    }

    animateButtons();
});