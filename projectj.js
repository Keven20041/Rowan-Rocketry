document.addEventListener('DOMContentLoaded', () => {
    // Star field animation
    const canvas = document.createElement('canvas');
    canvas.id = 'starField';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    canvas.style.zIndex = '-1';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';

    let width, height, stars;
    const STAR_COUNT = 100;

    function init() {
        resizeCanvas();
        createStars();
        animate();
        console.log('If you see this the code is working');
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5,
                brightness: Math.random()
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function updateStars() {
        stars.forEach(star => {
            star.y += star.speed;
            if (star.y > height) {
                star.y = 0;
                star.x = Math.random() * width;
                star.brightness = Math.abs(Math.sin(Date.now() * 0.01 * star.speed));
            }
        });
    }

    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    init();

    // Planet animation
    const titleContainer = document.getElementById('title-container');
    const planets = document.querySelectorAll('.planet');

    function animatePlanets() {
        const containerRect = titleContainer.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        planets.forEach((planet, index) => {
            const angle = Date.now() * 0.001 * (index + 1) * 0.5;
            const radius = 80 + index * 30;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            planet.style.transform = `translate(${x - planet.offsetWidth / 2}px, ${y - planet.offsetHeight / 2}px)`;
        });
        requestAnimationFrame(animatePlanets);
    }
    animatePlanets();

    // Debounce function for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

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

    // Debounced resize event listener
    window.addEventListener('resize', debounce(() => {
        init();
    }, 200));

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    header.style.position = 'relative';
    header.style.zIndex = '1';

    // Scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    function handleMenuToggle(e) {
        e.preventDefault();
        navList.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    }

    mobileMenuToggle.addEventListener('click', handleMenuToggle);
    mobileMenuToggle.addEventListener('touchend', handleMenuToggle);

    // Prevent default touch behavior on the toggle button
    mobileMenuToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    // Close mobile menu when clicking or touching outside
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);

    function handleOutsideClick(e) {
        if (!header.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }


    // Throttled scroll event listener
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }, 100));


    // Smooth scrolling for anchor links
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
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Image slider functionality
    const sliders = document.querySelectorAll('.image-slider');

    sliders.forEach((slider) => {
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

        let autoAdvanceInterval = setInterval(goToNext, 5000);

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoAdvanceInterval);
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                goToNext();
            } else if (touchEndX - touchStartX > 50) {
                goToPrev();
            }
            autoAdvanceInterval = setInterval(goToNext, 5000);
        }, { passive: true });

        // Pause auto-advance on hover for desktop
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(goToNext, 5000);
        });
    });

    // Scroll to top button click event
    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.classList.toggle('visible');
            dropdownToggle.setAttribute('aria-expanded', dropdownContent.classList.contains('visible'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownContent.classList.remove('visible');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Support keyboard navigation
        dropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownContent.classList.remove('visible');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownToggle.focus();
            }
        });
    });

    // Additional mobile-specific functionality
    if ('ontouchstart' in window) {
        // Disable hover effects on touch devices
        document.body.classList.add('touch-device');

        // Add touch-friendly dropdown behavior
        dropdowns.forEach((dropdown) => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            dropdownToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                dropdowns.forEach((d) => {
                    if (d !== dropdown) {
                        d.querySelector('.dropdown-content').classList.remove('visible');
                        d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                    }
                });
                dropdown.querySelector('.dropdown-content').classList.toggle('visible');
                dropdownToggle.setAttribute('aria-expanded', dropdown.querySelector('.dropdown-content').classList.contains('visible'));
            });
        });
    }
});

