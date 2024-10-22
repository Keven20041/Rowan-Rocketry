document.addEventListener('DOMContentLoaded', () => {
    const starField = document.createElement('div');
    starField.id = 'starField';
    starField.className = 'star-container';
    document.body.prepend(starField);

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Randomize the animation duration for more natural movement
        const moveDuration = Math.random()/4; // 3-13 seconds
        const twinkleDuration = Math.random() * 5 + 2; // 2-7 seconds
        const glowDuration = Math.random() * 5 + 2; // 2-7 seconds

        star.style.animation = `
            moveStar ${moveDuration}s infinite infinite,
            twinkle ${twinkleDuration}s infinite alternate,
            glow ${glowDuration}s infinite alternate
        `;

        starField.appendChild(star);

        // Remove the star and create a new one after it completes its movement
        setTimeout(() => {
            star.remove();
            createStar();
        }, moveDuration * 1000);
    }

    // Create initial set of stars
    for (let i = 0; i < 25; i++) {
        setTimeout(createStar, Math.random() * 1000);
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

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
        }, false);

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                goToNext();
            } else if (touchEndX - touchStartX > 50) {
                goToPrev();
            }
        }, false);
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
            dropdownContent.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.style.display = 'none';
        });
    });
});