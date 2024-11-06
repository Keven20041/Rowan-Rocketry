document.addEventListener('DOMContentLoaded', () => {
    // Star field animation
    const canvas = document.createElement('canvas');
    canvas.id = 'starField';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    // Set the z-index of the canvas
    canvas.style.zIndex = '-1';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';

    let width, height, stars;
    const FPS = 60;
    const STAR_COUNT = 100;

    function init() {
        resizeCanvas();
        createStars();
        animate();
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

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(init, 200);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    // Ensure the header is above the star field
    header.style.position = 'relative';
    header.style.zIndex = '1';

    // Scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    // Scroll event listener
    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
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

        // Auto-advance the slider every 5 seconds
        setInterval(goToNext, 5000);

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

    // Scroll to top button click event
    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('mouseenter', () => {
            dropdownContent.classList.add('visible');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.classList.remove('visible');
        });
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.team-card, .team-card1, .team-members h1, .team-members h2').forEach(el => {
        observer.observe(el);
    });
});