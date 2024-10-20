document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image slider functionality
    const sliders = document.querySelectorAll('.image-slider');

    sliders.forEach((slider, index) => {
        const container = slider.querySelector('.slider-container');
        const prevButton = slider.querySelector('.slider-button-left');
        const nextButton = slider.querySelector('.slider-button-right');
        const items = slider.querySelectorAll('.slider-item');
        const progressBar = slider.querySelector('.progress-bar');
        let currentIndex = 0;

        function updateSlider() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            progressBar.style.transform = `translateX(${currentIndex * 100}%)`;
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

        // Auto-advance the slider every 5 seconds
        setInterval(goToNext, 5000);

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                goToNext();
            } else if (touchEndX - touchStartX > 50) {
                goToPrev();
            }
        }
    });

    // Scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.style.display = 'none';
        });
    });
});