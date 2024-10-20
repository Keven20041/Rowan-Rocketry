 // Scroll to top button visibility
 const scrollTopBtn = document.querySelector('.scroll-top');
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         scrollTopBtn.classList.add('visible');
     } else {
         scrollTopBtn.classList.remove('visible');
     }
 });

 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Header background change on scroll
 const header = document.querySelector('header');
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 50) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });
 // this is for tab switching in the sponsorship.html page for the tabs
 document.addEventListener('DOMContentLoaded', function() {
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
});
//for mobile switching
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });
});
//This is for the image slider in the project.html page
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach((slider, index) => {
        const container = slider.querySelector('.slider-container');
        const prevButton = slider.querySelector('.slider-button-left');
        const nextButton = slider.querySelector('.slider-button-right');
        const images = slider.querySelectorAll('.slider-image');
        let currentIndex = 0;

        function updateSlider() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });
    });
//project.html page for the image slider
    // Scroll to top functionality
    const scrollTopButton = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    mobileMenuToggle.addEventListener('click', () => {
        navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    });
});